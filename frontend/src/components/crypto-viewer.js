// React
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// Components
import CryptoChart from './crypto-chart';
import { useLocation, useParams } from "react-router-dom";
// Logic
import * as externalApi from '../logic/external-api';
import M from 'materialize-css';
import * as utils from '../logic/utils';


const CryptoViewer = (props) => {

    const params = useParams();
    const [coin, setCoin] = useState(null);

    useEffect(() => {
        if (params && params.coin) {

            externalApi.coinInfoAdvance(params.coin).then(result => {
                if (result.status == 200 && result.data){
                    setCoin(result.data);
                }
            });

        }
    }, [params.coin])
    

    if (coin) {

        return (

            <div className="coin-viewer">
                <h3>{coin.name}</h3>
                <div className="row">
                    <p className="flow-text col s6">
                        Price: ${utils.formatNumberToFixedLocale(coin.market_data.current_price.usd)}
                    </p>
                    <p className="flow-text col s6">
                        Market Cap: ${utils.formatNumberToFixedLocale(coin.market_data.market_cap.usd)}
                    </p>
                </div>

                <div className="row">
                    <p className="flow-text col s6">
                        24 hour Change: {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(2)}%
                    </p>
                    <p className="flow-text col s6">
                        24 hour Volume: ${utils.formatNumberToFixedLocale(coin.market_data.total_volume.usd)}
                    </p>
                </div>

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