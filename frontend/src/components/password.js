// React
import React, { useState, useEffect, useRef, createContext } from 'react';
import PropTypes from 'prop-types';
// Logic
import * as api from '../logic/api';
// Materialize
// import M from 'materialize-css';

const Password = props => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [passwordError, setPasswordError] = useState('');    
    const [passwordConfirmError, setPasswordConfirmError] = useState('');

    return (

        <div className="account-container">

            <h3 className="center">Change password</h3>

            <div className="row password-section">   

                {/* <h5 className="center">Change password</h5>       */}

                <div className="input-field custom-outlined col s12">
                    <input id="password" type="password" className="" autoComplete="new-password" onChange={(event) => setOldPassword(event.target.value)}  />
                    <label htmlFor="password">Current password</label>
                    <span className="helper-text error">{passwordError}</span>
                </div>

                <div className="input-field custom-outlined col s12">
                    <input id="new-password" type="password" className=""  onChange={(event) => setNewPassword(event.target.value)}  />
                    <label htmlFor="new-password">New password</label>                                       
                    <span className="helper-text error">{passwordError}</span>
                </div>

                <div className="input-field custom-outlined col s12">
                    <input id="new-password-confirm" type="password" className=""  onChange={(event) => setNewPasswordConfirm(event.target.value)}  />
                    <label htmlFor="new-password-confirm">Confirm new password</label>                                       
                    <span className="helper-text error">{passwordConfirmError}</span>
                </div>

                <div className="center">
                    <button className="btn" onClick={() => onUpdatePassword()}>
                        Update Password
                    </button>
                </div>

            </div>
        </div>

    )

    function passwordIsValid() {
        const passwordMatch = newPassword === newPasswordConfirm;

        if (passwordMatch && newPassword !== '') {
            setPasswordError('');
            setPasswordConfirmError('');
        }
        else if (newPassword === '' && newPasswordConfirm === '') {
            setPasswordConfirmError("Please enter a new password");
            setPasswordError("");
        }
        else if (newPasswordConfirm === '') {
            setPasswordConfirmError("");
            setPasswordError("Please confirm your new password");
        }
        else {
            setPasswordError('');
            setPasswordConfirmError("New password confirmation doesn't not match");
        }

        return newPassword !== '' && passwordMatch;

    }

    function passwordIsValid() {
        const passwordMatch = newPassword === newPasswordConfirm;

        if (passwordMatch && newPassword !== '') {
            setPasswordError('');
            setPasswordConfirmError('');
        }
        else if (newPassword === '' && newPasswordConfirm === '') {
            setPasswordConfirmError("Please enter a new password");
            setPasswordError("");
        }
        else if (newPasswordConfirm === '') {
            setPasswordConfirmError("");
            setPasswordError("Please confirm your new password");
        }
        else {
            setPasswordError('');
            setPasswordConfirmError("New password confirmation doesn't not match");
        }

        return newPassword !== '' && passwordMatch;

    }

    function onUpdatePassword() {
        if (passwordIsValid()) {
            api.update_password(newPassword, oldPassword).then(result => {
                console.log(result);

                if (result.data && result.data.status === "error") {
                    M.toast({
                        html: "Password failed to update",
                        classes: "rounded"
                    });
                }
                else {
                    M.toast({
                        html: "Password updated!",
                        classes: "rounded"
                    });
                }


            })
            .catch(error => {
                console.log("error");
                console.log(error);
                M.toast({
                    html: "Password failed to update",
                    classes: "rounded"
                });
            })
        }

    }
}

export default Password;