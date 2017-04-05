import React from 'react';
import {connect} from "react-redux";
import { changeSideMenuMode } from "../redux/actions/sideMenuActions.jsx";
import { addRequirement } from "../redux/actions/requirementActions.jsx";

import RequirementForm from './form/RequirementForm.jsx';

class NewRequirement extends React.Component {

    componentDidMount(){
        this.props.changeSideMenuMode("HIDE");
    }

    render() {

        const structure = [
            {
                source: "something"
            },
            {
                artifact: "something"
            },
            {
                response: "something"
            },
            {
                responsemeasure: "something"
            },
            {
                environment: "something"
            },
            {
                stimulus: "something"
            }
        ];

        return (
            <RequirementForm structure={structure} onSubmit={this.props.addRequirement}/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        mode: state.sideMenuReducer.mode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeSideMenuMode: (mode) => {
            dispatch(changeSideMenuMode(mode))
        },
        addRequirement: (requirement) => {
            dispatch(addRequirement(requirement))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRequirement);