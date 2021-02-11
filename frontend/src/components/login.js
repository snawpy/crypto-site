import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
// Logic
import * as utils from '../logic/utils';
import * as api from '../logic/api';
import * as cookies from '../logic/cookies';
// Materialize
import M from 'materialize-css';

const Login = props => {
    
    // todo v1
    const loginModalElement = useRef(null);
    const mInstance = useRef(null);

    const [password, setPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');  

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {

        // v1
        if (loginModalElement) {
            mInstance.current = M.Modal.init(loginModalElement.current, {
                onOpenStart: () => clearFields(),
                onCloseEnd: () => clearFields(),

                onOpenEnd:() => clearFields(),
                onCloseStart: () => clearFields()
            });
        }

    }, []);



    return (
        <React.Fragment>

            {/* todo v1 */}
            <div id="modal-login" className="modal" ref={loginModalElement}>
                <div className="modal-content">
                    <h4>Sign in</h4>
                    <div className="row">
                        <div className="input-field input-spacing col s12">
                            <input id="login-email" type="email" className="" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} onKeyUp={event => onEnter(event)}/>
                            <label htmlFor="login-email">Email</label>                                       
                            <span className="helper-text error">{emailError}</span>
                        </div>

                        <div className="input-field input-spacing col s12">
                            <input id="login-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} onKeyUp={event => onEnter(event)}/>
                            <label htmlFor="login-password">Password</label>
                            <span className="helper-text error">{passwordError}</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="waves-effect waves-light btn red lighten-1 modal-close cancel-button">Cancel</button>
                    <button className="waves-effect waves-light btn" type="submit" onClick={() => onSubmit()}>Log In</button>            
                </div>
            </div>

        </React.Fragment>
    );

    function onEnter(event) {
        if (event.key === 'Enter') {
            onSubmit();
        }
    }

    function onSubmit() {
        if (isValid()){
            onLogin();
        }
    }

    function isValid() {
        const emailIsValid = utils.isEmailValid(userEmail);

        if (emailIsValid) {
            setEmailError("");
        }
        else {
            setEmailError("Please enter a valid email address");
        }

        if (password !== ''){
            setPasswordError('');
        }
        else {
            setPasswordError('Please enter a password');
        }
        return password !== '' && emailIsValid;
    }
    
    function onLogin() {       
        api.login(password, userEmail).then(result => {
            if (result && result.ok && result.data.token) {
                cookies.setUserToken(result.data.token);
                props.setLoggedIn(true);

                M.toast({
                    html: "Login Success!",
                    classes: "rounded"
                });

                mInstance.current.close();
                
            }
            else {
                M.toast({
                    html: "Login Failed!",
                    classes: "rounded"
                });
            }
        })
        .catch(err => {
            console.log("error");
            console.log(err);

            M.toast({
                html: "Login Failed!",
                classes: "rounded"
            });

        });
    }

    function clearFields() {
        setPassword('');
        setUserEmail('');
        setEmailError('');
        setPasswordError('');

        // modal text fields keep active styling if closed with text in them, even when clearing them 
        M.updateTextFields();
    }
}

// todo
// Login.PropTypes = {
// };

export default Login;