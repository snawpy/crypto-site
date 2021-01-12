// React
import React from 'react';
// todo: fill in proptypes
import PropTypes from 'prop-types';


const NavButton = (props) => {
    if (props.display) {
        return ( 
            <li>
                <div onClick={() => onClick() } className={props.class} data-target={props.dataTarget}>
                    {props.text}
                </div>
            </li>            
        );
    }

    return null;

    function onClick() {
        if (props.onClick) {
            props.onClick();
        }
    }

}



export default NavButton;