// React
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Components
import CryptoChart from './crypto-chart';
import { useLocation, useParams } from "react-router-dom";
// Logic
import * as externalApi from '../logic/external-api';


const CryptoViewer = (props) => {

    const [coin, setCoin] = useState(null);

    useEffect( () => {
        if (params && params.coin) {
            externalApi.coinPrice(params.coin, ["usd"]).then(result => {
                console.log(result);
            })
        }
    }, [])

    const params = useParams();

    if (params && params.coin) {
        // change this to load with coin or name passed in since we m
        return (
            <div className="coin-viewer">
                <h3>{params.coin}</h3>
                <p className="flow-text">Coming Soon!</p>

                {/* just import M from home seems to work */}
                <button className="btn-large waves-effect" onClick={() => M.toast({html: 'Coming soon!'})}>
                    Add To Portfolio
                </button>

                <CryptoChart coin={params.coin}/>
            </div>
        )
    }
    else {
        console.log("nothing here m8");
        return (
            <div>
                hehhe
            </div>
        )
    }

}


// CryptoViewer.propTypes = {
// todo
// };


export default CryptoViewer;