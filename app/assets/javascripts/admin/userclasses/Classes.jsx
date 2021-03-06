/**
 * Class represents /admin/classes.
 * Parent: {@link Admin}
 * Children: {@link ClassForm}.
 */
import React from 'react';
import {connect} from "react-redux";
import { getUsersWithClass, getUserClasses } from "./../../redux/actions/userActions";
import { fillClassForm, postClassNew, postClassUpdate, postClassDelete } from "./../../redux/actions/classFormActions";
import { dialogOpen, dialogChangeAction } from './../../redux/actions/dialogActions';
import { popoverAdd } from './../../redux/actions/popoverActions';
import RaisedButton from 'material-ui/RaisedButton';
import DataTable from '../../core/table/DataTable';
import ClassFormDialog from './ClassFormDialog';
import ClassFormDialogDelete from './ClassFormDialogDelete';
import {IconButton, IconMenu, MenuItem, ToolbarGroup, ToolbarSeparator} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Ellipsis from "../../core/popover/Ellipsis";
import Popover from "../../core/popover/Popover";

class Classes extends React.Component {

    componentWillMount() {
        this.props.popoverAdd('userClasses');
    }

    /**
     * Called when the component did mount.
     */
    componentDidMount() {
        this.props.getUserClasses();
    }

    render() {
        const {
            userClasses, uClass,
            postClassNew,
            postClassUpdate,
            postClassDelete,
            fillForm,

            updateDialogIsOpen, updateDialog,
            deleteDialogIsOpen, deleteDialog
        } = this.props;

        const config = {
            table: 'userClasses',
            data: userClasses,
            columns: [
                {label: 'Navn', property: 'NAME', width: '25%'},
                {label: 'Beskrivelse', property: 'description', width: '61%', wrap: {
                        lines: 3,
                        ellipsis: (userClass) => {
                            const props = {
                                component: 'userClasses',
                                object: userClass,
                                property: 'description'
                            };
                            return <Ellipsis {...props} />
                        }
                    }
                },
                {type: 'EDIT_ACTION', action: (uClass) => { updateDialog(true); fillForm(uClass); }, width: '24px'},
                {type: 'DELETE_ACTION', action: (uClass) => { deleteDialog(true); fillForm(uClass); }, width: '24px'}
            ],
            toolbar: {
                title: 'Brukerklasser',
                search: 'NAME',
                render: () => {
                    return (
                        <ToolbarGroup>
                            <ToolbarSeparator />
                            <RaisedButton label="Ny Brukerklasse" primary={true} onTouchTap={() => { updateDialog(true); fillForm(null); }} />
                        </ToolbarGroup>
                    );
                }
            }
        };

        return (
            <div className="container" style={{justifyContent: 'center'}}>
                <div className="table">
                    <DataTable config={config}/>
                </div>

                <ClassFormDialog
                    title={uClass ? 'Endre Brukerklasse' : 'Ny Brukerklasse'}
                    open={updateDialogIsOpen}
                    classes={userClasses}
                    onRequestClose={updateDialog.bind(null, false)}
                    handleSubmit={
                        (values, dispatch, props) => {
                            if (uClass) {
                                postClassUpdate(values, dispatch, props);
                            } else {
                                postClassNew(values, dispatch, props);
                            }
                            updateDialog(false);
                        }
                    }
                />

                <ClassFormDialogDelete
                    title={'Slett Brukerklasse'}
                    open={deleteDialogIsOpen}
                    classes={userClasses}
                    onRequestClose={deleteDialog.bind(null, false)}
                    handleSubmit={
                        (values, dispatch, props) => {
                            postClassDelete(values, dispatch, props);
                            deleteDialog(false);
                        }
                    }
                />

                <Popover component="userClasses"/>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uClass: state.classFormReducer.uClass,
        userClasses : state.userReducer.userClasses,
        updateDialogIsOpen: state.dialogReducer.classUpdate.isOpen,
        deleteDialogIsOpen: state.dialogReducer.classDelete.isOpen
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fillForm: (uClass) => {
            dispatch(fillClassForm(uClass))
        },
        postClassNew: (data) => {
            dispatch(postClassNew(data));
        },
        postClassUpdate: (data) => {
            dispatch(postClassUpdate(data));
        },
        postClassDelete: (data) => {
            dispatch(postClassDelete(data));
        },
        getUsersWithClass: () => {
            dispatch(getUsersWithClass())
        },
        getUserClasses: () => {
            dispatch(getUserClasses())
        },
        updateDialog: (open) => {
            dispatch(dialogOpen('classUpdate', open));
        },
        deleteDialog: (open) => {
            dispatch(dialogOpen('classDelete', open));
        },
        popoverAdd: (popover) => {
            dispatch(popoverAdd(popover));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);