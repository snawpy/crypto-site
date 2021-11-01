// React
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Components
import CryptoChart from './crypto-chart';
import { useLocation, useParams } from "react-router-dom";
// Logic
import * as externalApi from '../logic/external-api';
import M from 'materialize-css';


const CryptoViewer = (props) => {

    const [coin, setCoin] = useState(null);

    useEffect( () => {
        if (params && params.coin) {
            externalApi.coinPrice(params.coin, ["usd"]).then(result => {
                if (result.data && result.data[params.coin]) {
                    setCoin(result.data[params.coin]);
                    console.log(result.data[params.coin]);
                }                
            })
        }
    }, [])

    const params = useParams();

    if (coin) {
        // change this to load with coin or name passed in since we m
        console.log(coin.usd.toLocaleString(undefined, {minimumFractionDigits: 2}))
        return (
            <div className="coin-viewer">
                <h3>{params.coin}</h3>
                <p className="flow-text">
                    Price: ${coin.usd.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </p>
                <p className="flow-text">
                    Market Cap: ${coin.usd_market_cap.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </p>
                <p className="flow-text">
                    24 hour Change: {coin.usd_24h_change.toFixed(2)}%
                </p>
                <p className="flow-text">
                    24 hour Volume: ${coin.usd_24h_vol.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </p>

                <button className="btn-large waves-effect" onClick={() => M.toast({html: 'Coming soon!'})}>
                    Add To Portfolio
                </button>

                {/* <CryptoChart coin={params.coin}/> */}
            </div>
        )
    }

    return (
        <div>
            Loading...
        </div>
    )

}


// CryptoViewer.propTypes = {
// todo
// };


export default CryptoViewer;