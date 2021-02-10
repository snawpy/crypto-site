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

export default NavBarTop;













//--------------------------------------------------------------------------------------------------------------------
// original
// React
// import React, { useRef, useEffect, useState, useReducer } from 'react';
// // todo: fill in proptypes
// import PropTypes from 'prop-types';
// // Component
// import DropDown from './drop-down';
// // Materialize
// import M, { Dropdown } from 'materialize-css';

// const NavBarTop = props => {

//     const sideNavElement = useRef(null);
//     const sideNavInstance = useRef(null);

//     useEffect(() => {
//         if (sideNavElement) {            
//             sideNavInstance.current = M.Sidenav.init(sideNavElement.current);
//         }
        
//     }, [])

//     return (
//        <React.Fragment>
//             {renderTopNavBar()}
//             {renderSideNavBar()}
//        </React.Fragment> 
//     );

//     function renderTopNavBar() {
//         return (
//             <nav className="nav-extended">                
//                 <div className="nav-wrapper">
//                     <a href="#" onClick={() => {if (props.displayMode !== props.page.cryptoList) props.onSetDisplayMode(props.page.cryptoList)}} className="brand-logo">My Crypto Gains</a>
//                     <a href="#" data-target="side-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    
//                     <ul id="nav-mobile" className="right hide-on-med-and-down">
//                         {renderAccountDropDownButton('account-top-nav-bar')}
//                         {renderButtons()}
//                     </ul>

//                 </div>
//             </nav>
//         );
//     }

//     function renderSideNavBar() {
//         return (
//             <ul className="sidenav " id="side-nav" ref={sideNavElement}>
//                 {renderAccountDropDownButton('account-side-nav-bar')}
//                 {renderButtons()}
//             </ul>
//         );
//     }

//     function renderAccountDropDownButton(id) {        
//         if (props.loggedIn) {
//             return (
//                 <React.Fragment>
//                     <DropDown 
//                         loggedIn={props.loggedIn}
//                         onSetDisplayMode={(value) => onSetDisplayMode(value)}
//                         page={props.page}
//                         id={id}
//                     /> 
//                 </React.Fragment>
//             );
//         }

//         return null;

//     }

//     function renderButtons() {
//         return (
//             <React.Fragment>
//                 <NavButton 
//                     text={'Register'}
//                     display={!props.loggedIn}
//                     class="modal-trigger sidenav-close"
//                     dataTarget="modal-register"
//                 />

//                 <NavButton 
//                     text={'Log in'}
//                     display={!props.loggedIn}
//                     class="modal-trigger sidenav-close"
//                     dataTarget="modal-login"
//                 />

//                 <NavButton
//                     text={'Log Out'}
//                     display={props.loggedIn}
//                     // onClick={() => props.onSignOut(true)}
//                     onClick={() => onSignOut()}
//                     class={"sidenav-close"}
//                 />
//             </React.Fragment>
//         )
//     }

//     function onCloseSideNavBar() {
//         if (sideNavInstance.current.isOpen) {
//             sideNavInstance.current.close();
//         }
//     }

//     function onSetDisplayMode(displayMode) {
//         onCloseSideNavBar();
//         props.onSetDisplayMode(displayMode);
//     }



//     function onSignOut() {
//         props.onSignOut(true);
//     }




// }


// const NavButton = (props) => {
//     if (props.display) {
//         return ( 
//             <li>
//                 <div onClick={() => callBack() } className={props.class} data-target={props.dataTarget}>
//                     {props.text}
//                 </div>
//             </li>            
//         );
//     }

//     return null;

//     function callBack() {
//         if (props.onClick) {
//             props.onClick();
//         }
//     }

// }



// export default NavBarTop;