// React
import React, { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
// Logic
import * as utils from '../logic/utils';
import * as api from '../logic/api';
// Materialize
import M from 'materialize-css';

const Register = props => {

    // v1
    const registerModalElement = useRef(null);
    const mInstance = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');    

    const [emailError, setEmailError] = useState('');
    const [passwordConfirmError, setPasswordConfirmError] = useState('');    
    const [passwordError, setPasswordError] = useState('');


    useEffect(() => {
        // v1
        if (registerModalElement) {
            // storing response from M.Sidenav.init so we can gain access to functionality ie the .close()
            mInstance.current = M.Modal.init(registerModalElement.current, {
                onOpenStart: () => clearFields(),
                onCloseEnd: () => clearFields()
            });
        }

    }, []);

    return (      
        <div id="modal-register" className="modal" ref={registerModalElement}>
            <div className="modal-content">
                <h4>Create account</h4>
                <div className="row">
                    <div className="input-field input-spacing col s12">
                        <input id="register-email" type="email" className="" value={email} onChange={(event) => setEmail(event.target.value)} onKeyUp={event => onEnter(event)}/>
                        <label htmlFor="register-email">Email</label>                                       
                        <span className="helper-text error">{emailError}</span>
                    </div>
                    <div className="input-field input-spacing col s12">
                        <input id="register-password" type="password" className="" value={password} onChange={(event) => setPassword(event.target.value)} onKeyUp={event => onEnter(event)}/>
                        <label htmlFor="register-password">Password</label>
                        <span className="helper-text error">{passwordError}</span>
                    </div>
                    <div className="input-field input-spacing col s12">
                        <input id="register-confirm-password" type="password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} onKeyUp={event => onEnter(event)}/> 
                        <label htmlFor="register-confirm-password">Confirm password</label>
                        <span className="helper-text error">{passwordConfirmError}</span>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button className="waves-effect waves-light btn red lighten-1 modal-close">Cancel</button>
                <button className="waves-effect waves-light btn" onClick={() => onSubmit()}>Register</button>            
            </div>             
        </div>
    );

    function onEnter(event) {
        if (event.key === 'Enter') {
            onSubmit();
        }
    }

    function onSubmit() {
        if (isValid()) {
            register();
        }
    }

    function isValid() {
        const passwordMatch = password === passwordConfirm;
        const validEmail = utils.isEmailValid(email);

        if (passwordMatch && password !== '') {
            setPasswordConfirmError('');
            setPasswordError('');
        }
        else if (password === '' && passwordConfirm === '') {
            setPasswordError("Please enter a password");
            setPasswordConfirmError("");
        }
        else if (passwordConfirm === '') {
            setPasswordError("");
            setPasswordConfirmError("Please confirm your password");
        }
        else {
            setPasswordError('');
            setPasswordConfirmError("Passwords don't match");
        }

        if (validEmail) {
            setEmailError('');
        }
        else {
            setEmailError('Please enter a valid email address');
        }

        return password !== '' && passwordMatch && validEmail;

    }


    function register() {
        api.register(email, password).then(result => {
            // TODO
            if (result.status == 200) {
                M.toast({
                    html: "Registation successful, please log in!",
                    classes: "rounded"
                });
                mInstance.current.close();                
            }
            else {
                if (result.status == 400 && result.data && result.data.username && result.data.username.length > 0) {
                    setEmailError('Email already registered');
                    M.toast({
                        html: "Email already registered",
                        classes: "rounded"
                    });
                }
                else if (result.status == 400 && result.data && result.data.email && result.data.email.length > 0) {
                    setEmailError('Please enter a valid Email address');
                    // missed by front end checks
                    M.toast({
                        html: "Please enter a valid Email address",
                        classes: "rounded"
                    });
                }
                else {
                    M.toast({
                        html: "Registration failed, please try again",
                        classes: "rounded"
                    });
                }
            }
        })
        .catch(err => {
            M.toast({
                html: "Registration failed, please try again",
                classes: "rounded"
            });

            console.log("caught registration error");
            console.log(err);
        })

    }



    function clearFields() {
        setEmailError('');
        setPasswordConfirmError('');
        setPasswordError('');

        setEmail('');
        setPassword('');
        setPasswordConfirm('');

        // modal text fields keep active styling if closed with text in them, even when clearing them 
        M.updateTextFields();
    }

}



export default Register;