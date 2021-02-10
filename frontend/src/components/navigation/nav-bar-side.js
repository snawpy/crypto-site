// React
import React, { useRef, useEffect, useState, useReducer } from 'react';
// todo: fill in proptypes
import PropTypes from 'prop-types';
// Component
import NavButton from './nav-button';
import AccountDropDown from './drop-down';
// Materialize
import M from 'materialize-css';

const NavBarSide = props => {

    const sideNavElement = useRef(null);
    const sideNavInstance = useRef(null);

    useEffect(() => {
        if (sideNavElement) {            
            sideNavInstance.current = M.Sidenav.init(sideNavElement.current);
        }
        
    }, [])

    return (
        <ul className="sidenav " id="side-nav" ref={sideNavElement}>
            {renderAccountDropDownButton('account-side-nav-bar')}
            {renderButtons()}
        </ul>
    );

    function renderAccountDropDownButton(id) {        
        if (props.loggedIn) {
            return (
                <React.Fragment>
                    <AccountDropDown 
                        loggedIn={props.loggedIn}
                        onSetDisplayMode={(value) => onSetDisplayMode(value)}
                        page={props.page}
                        id={id}
                    /> 
                </React.Fragment>
            );
        }

        return null;

    }

    function renderButtons() {
        return (
            <React.Fragment>
                <NavButton 
                    text={'Portfolio'}
                    display={true}
                    class="sidenav-close"
                    onClick={()=>M.toast({html: 'Coming soon!'})}
                    dataTarget="modal-register"
                />
                
                <NavButton 
                    text={'Register'}
                    display={!props.loggedIn}
                    class="modal-trigger sidenav-close"
                    dataTarget="modal-register"
                />

                <NavButton 
                    text={'Log in'}
                    display={!props.loggedIn}
                    class="modal-trigger sidenav-close"
                    dataTarget="modal-login"
                />

                <NavButton
                    text={'Log Out'}
                    display={props.loggedIn}
                    onClick={() => props.onSignOut(true)}
                    // onClick={() => onSignOut()}
                    class={"sidenav-close"}
                />
            </React.Fragment>
        )
    }

    function onSetDisplayMode(displayMode) {
        onCloseSideNavBar();
        props.onSetDisplayMode(displayMode);
    }

    function onCloseSideNavBar() {
        if (sideNavInstance.current.isOpen) {
            sideNavInstance.current.close();
        }
    }
}

export default NavBarSide;