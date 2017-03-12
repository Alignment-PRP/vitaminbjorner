import React from 'react';
import {connect} from 'react-redux'
import ProjectRequirements from '../requirements/ProjectRequirements.jsx';
import { getProjectById } from "../redux/actions/projectActions.jsx";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";


class Project extends React.Component {

    componentDidMount() {
        this.props.getProjectById(this.props.params.id);
        this.props.changeSideMenuMode("FILTER");
    }

    renderProject(){
        let id = "";
        let name = "";
        let desc = "";

        this.props.project.map((item)=>{
            id = item.projectid;
            name = item.name;
            desc = item.description;
        });

        return(
            <div className="singleProject">
                <h1>{name}</h1>
                <p>ID: {id}</p>
                <p>Beskrivelse:{desc}</p>
            </div>

        );
    }

    render() {
        return (
            <div className="container">
                {this.renderProject()}
                <div className="projectRequirements">
                    <ProjectRequirements id={this.props.params.id}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        project: state.projectReducer.project
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectById: (id) => {
            dispatch(getProjectById(id))
        },
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);