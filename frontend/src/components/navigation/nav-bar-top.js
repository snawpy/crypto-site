// React
import React, { useRef, useEffect, useState, useReducer } from 'react';
// todo: fill in proptypes
import PropTypes from 'prop-types';
// Component
import NavButton from './nav-button';
import AccountDropDown from './drop-down';


const NavBarTop = props => {

    const [email, setEmail] = useState('');

        return (
            <nav>                
                <div className="nav-wrapper">
                    <div className="col s12">

                        <a href="#" onClick={() => {if (props.displayMode !== props.page.cryptoList) props.onSetDisplayMode(props.page.cryptoList)}} className="brand-logo">Kimoski</a>
                        <a href="#" data-target="side-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {renderAccountDropDownButton('account-top-nav-bar')}
                            {renderButtons()}
                        </ul>

                        <ul className="right">
                            <li>
                                <div className="modal-trigger" data-target="modal-search">
                                    <i className="material-icons prefix">search</i>
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>    
        );

    function renderAccountDropDownButton(id) {        
        if (props.loggedIn) {
            return (
                <React.Fragment>
                    <AccountDropDown 
                        loggedIn={props.loggedIn}
                        onSetDisplayMode={(value) => props.onSetDisplayMode(value)}
                        page={props.page}
                        id={id}
                        constrainWidth={false}
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
                    class={"sidenav-close"}
                />
            </React.Fragment>
        )
    }

}

// todo
// NavBarTop.PropTypes = {
// };

export default NavBarTop;