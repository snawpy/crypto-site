// React
import React, { useState, useEffect, useRef, createContext } from 'react';
import PropTypes from 'prop-types';
// Logic
import * as api from '../logic/api';
// Materialize
import M from 'materialize-css';


const Profile = (props) => {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');   

    // const [oldPassword, setOldPassword] = useState('');
    // const [newPassword, setNewPassword] = useState('');
    // const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    // const [passwordError, setPasswordError] = useState('');    
    // const [passwordConfirmError, setPasswordConfirmError] = useState('');


    useEffect(() => {
        
        api.current_user()
            .then(result => {
                if (result.status == 200) {
                    setEmail(result.data.username);
                    setFirstName(result.data.first_name);
                    setLastName(result.data.last_name);
                    M.updateTextFields();
                }
            })
            .catch(error => {
                console.log("error:");
                console.log(error);
            });       

    }, [])


    return (
        <div className="account-container">
            <h3 className="center">Personal information</h3>
            
            <div className="row">                

                    <div className="input-field custom-outlined col s12">
                        <input id="user-email" type="email" className="" onChange={(event) => setEmail(event.target.value)} defaultValue={email} />
                        <label htmlFor="user-email">Email</label>                                       
                        {/* <span className="helper-text error"></span> */}
                    </div>    
                 
                    <div className="input-field custom-outlined col s12">
                        <input id="user-first-name" type="text" className=""  onChange={(event) => setFirstName(event.target.value)} defaultValue={firstName} />
                        <label htmlFor="user-first-name">Firstname</label>                                       
                        {/* <span className="helper-text error">{passwordError}</span> */}
                    </div>

                    <div className="input-field custom-outlined col s12">
                        <input id="user-last-name" type="text" className=""  onChange={(event) => setLastName(event.target.value)} defaultValue={lastName} />
                        <label htmlFor="user-last-name">Lastname</label>                                       
                        {/* <span className="helper-text error">{passwordConfirmError}</span> */}
                    </div>

                <div className="center">
                    <button className="btn" onClick={() => onUpdateDetails()}>
                        Save Changes
                    </button>
                </div>

            </div>

                        
            {/* <div className="row password-section">   

                <h5 className="center">Change password</h5>      

                <div className="input-field custom-outlined col s12">
                    <input id="password" type="password" className=""  onChange={(event) => setOldPassword(event.target.value)}  />
                    <label htmlFor="password">Old password</label>
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


            </div> */}

            




        </div>
    ); 

    // function passwordIsValid() {
    //     const passwordMatch = newPassword === newPasswordConfirm;

    //     if (passwordMatch && newPassword !== '') {
    //         setPasswordError('');
    //         setPasswordConfirmError('');
    //     }
    //     else if (newPassword === '' && newPasswordConfirm === '') {
    //         setPasswordConfirmError("Please enter a new password");
    //         setPasswordError("");
    //     }
    //     else if (newPasswordConfirm === '') {
    //         setPasswordConfirmError("");
    //         setPasswordError("Please confirm your new password");
    //     }
    //     else {
    //         setPasswordError('');
    //         setPasswordConfirmError("New password confirmation doesn't not match");
    //     }

    //     return newPassword !== '' && passwordMatch;

    // }

    // function onUpdatePassword() {
    //     if (passwordIsValid()) {
    //         api.update_password(newPassword, oldPassword).then(result => {
    //             console.log(result);

    //             if (result.data && result.data.status === "error") {
    //                 M.toast({
    //                     html: "Password failed to update",
    //                     classes: "rounded"
    //                 });
    //             }
    //             else {
    //                 M.toast({
    //                     html: "Password updated!",
    //                     classes: "rounded"
    //                 });
    //             }


    //         })
    //         .catch(error => {
    //             console.log("error");
    //             console.log(error);
    //             M.toast({
    //                 html: "Password failed to update",
    //                 classes: "rounded"
    //             });
    //         })
    //     }

    // }

    function onUpdateDetails() {
        api.update_details(email, firstName, lastName)
            .then(result => {
                M.toast({
                    html: "Details updated!",
                    classes: "rounded"
                });
                console.log(result);
            })
            .catch(error => {

                M.toast({
                    html: "Details failed to update",
                    classes: "rounded"
                });

                console.log("error:");
                console.log(error);
            });  
    }
    

}




// Profile.PropTypes = {

// };


export default Profile;