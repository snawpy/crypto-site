// React
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';


const AccountDropDown = props => {

    const instance = useRef(null);
    const element = useRef(null);
    let history = useHistory();

    useEffect(() => {
        
        if (element && props.loggedIn) {
            instance.current = M.Dropdown.init(element.current, {
                constrainWidth: props.constrainWidth,
                coverTrigger: false
            });
        }

        return () => {
            console.log("destroying");
            instance.current.destroy();
        }

    }, []);


    if (props.loggedIn) {
        return (
            <React.Fragment>
                <li>
                    <a href="#!" ref={element} data-target={props.id} className="dropdown-trigger">
                       Account 
                       <i className="material-icons right">arrow_drop_down</i>
                    </a>

                    <ul id={props.id} className="dropdown-content">
                        <li><a onClick={() => history.push("/account")}>Personal Info</a></li>
                        <li><a onClick={() => history.push("/password")}>Update Password</a></li>                        
                        <li className="divider"></li>
                        <li><a onClick={() => history.push("/delete-account")} className="">Delete Account</a></li>
                    </ul>
                </li>
    
            </React.Fragment>
        )
    }

    return null;

}

AccountDropDown.defaultProps = {
    constrainWidth: true
}

// todo
// AccountDropDown.PropTypes = {
// };

export default AccountDropDown; 