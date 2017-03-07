package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import database.QueryHandler;
import models.User;
import database.Statement;

import play.db.Database;
import play.mvc.Controller;
import play.mvc.Result;
import static play.mvc.Results.ok;
import javax.inject.Inject;
import java.util.Map;


/**
 * Created by andrfo on 24.02.2017.
 */
public class ProjectController extends Controller {



    private QueryHandler qh;

    @Inject
    public ProjectController(Database db) {
        this.qh = new QueryHandler(db);
    }


    public Result getUserRelatedProjects(){
        String userID = session("connected");
        //TODO checkAuthenticity();   HERE?
        if(userID == null){
            return unauthorized(views.html.login.render());
        }
        return ok(qh.getProjectRelatedToUser(userID));
    }

    /**
     * for testing.
     * @return a simple html view for inserting a new project.
     */
    public Result getNewProjectView(){
        return ok(views.html.newproject.render());
    }
    public Result newProject(){
        String userID = session("connected");
        if(userID == null){
            return unauthorized(views.html.login.render());
        }

        final Map<String, String[]> values = request().body().asFormUrlEncoded();

        String name = values.get("name")[0];
        String desc = values.get("desc")[0];
        String ispublic = values.get("ispublic")[0];
        if(projectNameExists(name)) {
            //TODO determine a good http response for "recource is ok and all but needs a different value"
            return status(200, "Project name is taken");
        }
        /** TODO:
         *  The one creating the project is now set to be both manager and owner of the project.
         *  Also sets the user as partof. This needs to be done properly. As in you when you set
         *  manager and owner those are set to part of(and checking if they are part of already).
         */

        qh.createProject(name, desc, ispublic, userID, userID, userID);
        return ok(views.html.dashboard.render());

    }

    public Result getPublicProjects(){
        return ok(qh.getPublicProjects());
    }
    public boolean projectNameExists(String name){
        JsonNode exists = qh.projectNameExists(name);
        //System.out.println(exists.get(0).get("bool"));
        //System.out.println(exists.get(0).get("bool").asInt() == 1);
        return exists.get(0).get("bool").asInt() == 1;
    }

    /** For single project view
     * Getting a project from project ID
     */
    public Result getProjectByProjectID(String id){
        String projectid = id;
        //Might as well keep the user check.
        String userID = session("connected");
        if(userID != null){
            //Returns and 200 OK with a JsonNode as Body.
            return ok(qh.getProjectByProjectID(projectid));
        }
        else{
            return unauthorized(views.html.login.render());
        }
    }



    public Result getProjectRequirements(String id){
        int projectID = Integer.parseInt(id);
        //TODO validate access permition
        JsonNode projectRequirements = qh.executeQuery(Statement.GET_PROJECT_REQUIREMENTS, projectID);
        return ok(projectRequirements);
    }

    public Result getProjectRequirementForm(){
        return ok(views.html.getProjectRequirements.render());
    }

    public Result addReq(){
        final Map<String, String[]> values = request().body().asFormUrlEncoded();
        String projectid = values.get("projectid")[0];
        String[] requirementid = values.get("requirementid");
        for(int i = 0; i < requirementid.length; i++){
            if(qh.executeQuery(Statement.REQUIREMENT_EXISTS, requirementid[i]).get(0).get("bool").asInt() != 1){
                return unauthorized(requirementid[i] + " is not a valid requirement");
            }
        }
        if(qh.executeQuery(Statement.PROJECT_EXISTS, projectid).get(0).get("bool").asInt() != 1){
            return unauthorized(projectid + " is not a valid projectid");
        }
        for(int i=0; i < requirementid.length; i++){
            JsonNode globalReq = qh.executeQuery(Statement.GET_GLOBAL_REQUIREMENT, requirementid[i]).get(0);
            qh.createProjectRequirement(projectid, globalReq.get("ispublic").asText(), globalReq.get("name").asText(),
            globalReq.get("description").asText(), globalReq.get("source").asText(), globalReq.get("stimulus").asText(),
            globalReq.get("artifact").asText(), globalReq.get("response").asText(), globalReq.get("responsemeasure").asText(),
            globalReq.get("environment").asText());
        }
        return ok("ok");

    }

    public Result addReqForm(){
        return ok(views.html.addGlobalReqToProject.render());
    }


}
