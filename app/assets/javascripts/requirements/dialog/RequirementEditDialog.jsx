import React from 'react';
import { connect } from 'react-redux';
import { changeStepperIndex, updateRequiredValues, updateOptionalValues, clearValues } from './../../redux/actions/requirementFormActions';
import { postUpdateRequirement } from './../../redux/actions/requirementActions';
import Dialog from 'material-ui/Dialog';
import RequirementFormStepper from "../form/RequirementFormStepper";
import RequirementRequiredForm from "../form/RequirementRequiredForm";
import RequirementOptionalForm from "../form/RequirementOptionalForm";

class RequirementEditDialog extends React.Component {

    constructor(props) {
        super(props);

        this.renderForm = this.renderForm.bind(this);
    }

    renderForm() {
        const {
            stepperIndex, categories, users, structures, structureTypes,
            changeStepperIndex, updateRequiredValues, updateOptionalValues,
            onRequestClose, postUpdateRequirement, requiredValues, clearValues
        } = this.props;
        switch (stepperIndex) {
            case 0:
                return (
                    <RequirementRequiredForm
                        categories={categories}
                        users={users}
                        onSubmit={(values) => {
                            changeStepperIndex(stepperIndex + 1);
                            updateRequiredValues(values);
                        }}
                        handleClose={() => {
                            onRequestClose();
                        }}
                    />
                );
            case 1:
                return (
                    <RequirementOptionalForm
                        structures={structures}
                        structureTypes={structureTypes}
                        onSubmit={(values)  => {
                            updateOptionalValues(values);

                            const optional = Object.keys(values).map(type => {
                                console.log(structures[type]);
                                for (let i = 0; i < structures[type].length; i++ ) {
                                    const struc = structures[type][i];
                                    if (struc.content.toLowerCase() === values[type].toLowerCase()) {
                                        return {id: struc.ID};
                                    }
                                }

                                return {type: type, content: values[type]};
                            });

                            postUpdateRequirement(requiredValues, optional);
                            clearValues();
                            onRequestClose();
                        }}
                        back={() => {
                            changeStepperIndex(stepperIndex - 1);
                        }}
                        handleClose={() => {
                            onRequestClose();
                        }}
                    />
                );
            default:
                return null
        }
    }

    render() {
        const {
            title, open, onRequestClose, stepperIndex
        } = this.props;
        return (
            <Dialog title={title}
                    open={open} modal={false}
                    onRequestClose={onRequestClose}
                    autoDetectWindowHeight={false}
                    autoScrollBodyContent={false}
                    Style={{width: "100%"}}
            >
                <RequirementFormStepper index={stepperIndex} />

                {this.renderForm()}
            </Dialog>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        stepperIndex: state.requirementFormReducer.stepperIndex,
        requiredValues: state.requirementFormReducer.requiredValues,
        optionalValues: state.requirementFormReducer.optionalValues,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeStepperIndex: (index) => {
            dispatch(changeStepperIndex(index));
        },
        updateRequiredValues: (values) => {
            dispatch(updateRequiredValues(values));
        },
        updateOptionalValues: (values) => {
            dispatch(updateOptionalValues(values));
        },
        postUpdateRequirement: (required, optional) => {
            dispatch(postUpdateRequirement({...required, structure: [...optional]}));
        },
        clearValues: () => {
            dispatch(clearValues());
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequirementEditDialog);