import React from 'react';
import ReactDOM from 'react-dom';

//Importing components that will be rendered by url link
import Root from './Root.jsx';
import Home from './Home.jsx';
import Logout from './utility/Logout.jsx';

//Project
import Projects from './projects/Projects.jsx';
import Project from './projects/Project.jsx';
import NewProject from './projects/NewProject.jsx';

//Requirements
import AllRequirements from './requirements/AllRequirements.jsx';
import UpdateRequirement from './requirements/UpdateRequirement.jsx';
import NewRequirement from './requirements/NewRequirement.jsx';

//Utility
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import {Provider} from "react-redux";
import store from './redux/store.jsx';


//Defining URL links
class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path={"/"} component={Root}>
                        <IndexRoute component={Home}/>
                        <Route path={"login"} component={Home}/>
                        <Route path={"projects"} component={Projects}/>
                        <Route path={"project/:id"} component={Project}/>
                        <Route path={"newproject"} component={NewProject}/>
                        <Route path={"allrequirements"} component={AllRequirements}/>
                        <Route path={"newrequirement"} component={NewRequirement}/>
                        <Route path={"update-requirement"} component={AllRequirements}/>
                        <Route path={"add-requirement"} component={AllRequirements}/>
                        <Route path={"editrequirement"} component={UpdateRequirement}/>
                        <Route path={"logout"} component={Logout}/>
                        <Route path={"testing"} component={Projects}/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(
    React.createElement(App, null),
    window.document.getElementById("app")
);