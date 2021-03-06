import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from "react-redux";
import {renderTextField, renderPassField, validateRegisterForm as validate} from './../core/render';
import {Paper, RaisedButton} from "material-ui";

class RegisterForm extends React.Component {

    render() {
        const { handleSubmit, pristine, submitting, handleBackButton, register } = this.props;
        return (
            <Paper id="loginForm">
                <h2>Ny Bruker</h2>
                {register.error ?
                    <div id="loginFailed">Brukernavnet eksisterer</div>
                    : null}
                <form onSubmit={handleSubmit}>
                    <div id="loginFields">
                        <Field
                            name="USERNAME"
                            label="Brukernavn"
                            component={renderTextField}
                            required
                        />
                        <Field
                            name="email"
                            label="Epost"
                            component={renderTextField}
                            required
                        />
                        <Field
                            name="firstName"
                            label="Fornavn"
                            component={renderTextField}
                            required
                        />
                        <Field
                            name="lastName"
                            label="Etternavn"
                            component={renderTextField}
                            required
                        />
                        <Field
                            name="pass"
                            label="Passord"
                            component={renderPassField}
                            required
                        />
                        <Field
                            name="pass_rep"
                            label="Gjenta Passord"
                            component={renderPassField}
                            required
                        />
                    </div>
                    <div id="loginButtons">
                        <RaisedButton className="form-button" primary={true} type="submit" label="Lagre" disabled={pristine || submitting}/>
                        <RaisedButton className="form-button" secondary={true} label="Tilbake" onTouchTap={handleBackButton}/>
                    </div>
                </form>
            </Paper>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        register: state.authReducer.register
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(reduxForm({
    form: 'Register',
    validate
})(RegisterForm));