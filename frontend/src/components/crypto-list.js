// React
import React from 'react';
import PropTypes from 'prop-types';


const CryptoList = (props) => {

    if (props.display) {
        return (
            <div>
                Crypto List
            </div>
        );        
    }

    return null;

}




// CryptoList.PropTypes = {

// };


export default CryptoList;