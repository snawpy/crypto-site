// React
import React, { useRef, useEffect, useState, useReducer } from 'react';
// todo: fill in proptypes
import PropTypes from 'prop-types';
// Component


const Widgets = props => {


    if (props.selectedCrypto && props.selectedCrypto.length > 0) {

        const coins = props.selectedCrypto.map(coin => renderCoinWidget(coin));

        return (
            <div className="coin-widgets-list">
                {coins}
            </div>
        )
    }

    return null;




    function renderCoinWidget(coin) {

        return (
            <div key={coin.id} className="coin-widget" draggable={true}>
                <div className="coin-widget-name">
                    {coin.name}
                </div>
                <div className="coin-widget-price">
                    <div>
                        {coin.price.usd}
                    </div>                    
                </div>
                <div className="coin-widget-value">
                    $420,000.00
                </div>
                <div className="coin-widget-quantity">
                    16273
                </div>
                

                {/* <img src={coin.thumb} alt="" className="circle"></img> {coin.name}
                <div>${coin.price.usd}</div>
                <div>£{coin.price.gbp}</div> */}
            </div>
        )
    }

}

export default Widgets;