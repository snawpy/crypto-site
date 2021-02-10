// React
import React from 'react';
import PropTypes from 'prop-types';


const CryptoViewer = (props) => {

    if (props.display && props.coin) {
        return (
            <div className="coin-viewer">
                <h3>{props.coin.name}</h3>
                <p class="flow-text">Coming Soon!</p>
            </div>
        )
    }

    return null;




}


// CryptoViewer.propTypes = {

// };


export default CryptoViewer;