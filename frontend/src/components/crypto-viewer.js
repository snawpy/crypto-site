// React
import React from 'react';
import PropTypes from 'prop-types';


const CryptoViewer = (props) => {

    if (props.display && props.coin) {
        return (
            <div className="coin-viewer">
                <h3>{props.coin.name}</h3>
                <p className="flow-text">Coming Soon!</p>

                {/* just import M from home seems to work */}
                <button className="btn-large waves-effect" onClick={() => M.toast({html: 'Coming soon!'})}>
                    Add To Portfolio
                </button>
            </div>
        )
    }

    return null;




}


// CryptoViewer.propTypes = {

// };


export default CryptoViewer;