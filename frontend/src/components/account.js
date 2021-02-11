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
                    </div>    
                 
                    <div className="input-field custom-outlined col s12">
                        <input id="user-first-name" type="text" className=""  onChange={(event) => setFirstName(event.target.value)} defaultValue={firstName} />
                        <label htmlFor="user-first-name">Firstname</label>
                    </div>

                    <div className="input-field custom-outlined col s12">
                        <input id="user-last-name" type="text" className=""  onChange={(event) => setLastName(event.target.value)} defaultValue={lastName} />
                        <label htmlFor="user-last-name">Lastname</label>
                    </div>

                <div className="center">
                    <button className="btn" onClick={() => onUpdateDetails()}>
                        Save Changes
                    </button>
                </div>

            </div>

        </div>
    ); 


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

// todo
// Profile.PropTypes = {
// };

export default Profile;