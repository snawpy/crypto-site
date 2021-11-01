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
    const [coinBasicInfo, setCoinBasicInfo] = useState(null);

    useEffect(() => {
        if (params && params.coin) {

            // only volume using basic info, volume not provided by advance end point WHYYY
            externalApi.coinInfoSimple(params.coin, ["usd"]).then(result => {
                if (result.data && result.data[params.coin]) {
                    setCoinBasicInfo(result.data[params.coin]);
                }                
            });

            externalApi.coinInfoAdvance(params.coin).then(result => {
                if (result.status == 200 && result.data){
                    // console.log(result.data);
                    setCoin(result.data);
                }
            });

        }
    }, [params.coin])
    

    if (coin && coinBasicInfo) {

        return (
            // <div className="coin-viewer">
            //     <h3>{params.coin}</h3>
            //     <p className="flow-text">
            //         Price: ${utils.formatNumberToFixedLocale(coinBasicInfo.usd)}
            //     </p>
            //     <p className="flow-text">
            //         Market Cap: ${utils.formatNumberToFixedLocale(coinBasicInfo.usd_market_cap)}
            //     </p>
            //     <p className="flow-text">
            //         24 hour Change: {coinBasicInfo.usd_24h_change.toFixed(2)}%
            //     </p>
            //     <p className="flow-text">
            //         24 hour Volume: ${utils.formatNumberToFixedLocale(coinBasicInfo.usd_24h_vol)}
            //     </p>

            //     <button className="btn-large waves-effect" onClick={() => M.toast({html: 'Coming soon!'})}>
            //         Add To Portfolio
            //     </button>

            //     {/* <CryptoChart coin={params.coin}/> */}
            // </div>

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
                        24 hour Volume: ${utils.formatNumberToFixedLocale(coinBasicInfo.usd_24h_vol)}
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