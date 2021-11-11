// React
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from "react-router-dom";
// Logic
import * as externalApi from '../logic/external-api';


const CryptoList = (props) => {

    const [cryptoListCoins, setCryptoListCoins] = useState(null); 
    let history = useHistory();

    useEffect(() => {
        loadCryptoListCoins();

        const cryptoLoader = setInterval(() => {
            loadCryptoListCoins();
        }, 60000);

        return () => {
            clearInterval(cryptoLoader);            
        }

    }, [])

    if (cryptoListCoins) {
        return (
            <div className="coin-list-container">
                {renderTable()}
            </div>
        )
    }

    return null;

    function renderTable() {

        const coins = cryptoListCoins.map(coin => renderCoin(coin));
        return (
            <table className="coin-list-all-coins">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24h Volume</th>
                        <th>Circulating Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {coins}
                </tbody>
            </table>
        );
    }


    function renderCoin(coin) {
        return (
            <tr key={coin.id} className="coin-list-coin">
                <td>{coin.market_cap_rank}</td>
                <td>
                    <div onClick={() => onCryptoClicked(coin)} className="coin-list-coin-name-group">
                        <img src={coin.image} alt="" className="crypto-list-coin-image"></img>
                        <span>
                            <span>{coin.name}</span> <span className="coin-list-coin-symbol">{coin.symbol.toUpperCase()}</span>
                        </span>                        
                    </div>
                    {/* <div className="coin-list-coin-name-group">
                        <Link to={`/coins/${coin.id}`}>
                            <img src={coin.image} alt="" className="crypto-list-coin-image"></img>
                            <span>
                                <span>{coin.name}</span> <span className="coin-list-coin-symbol">{coin.symbol.toUpperCase()}</span>
                            </span> 
                        </Link>                         
                    </div> */}
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td>${coin.market_cap.toLocaleString()}</td>
                <td>${coin.total_volume.toLocaleString()}</td>
                <td>{coin.circulating_supply.toLocaleString()}</td>
            </tr>
        );
    }


    function onCryptoClicked(coin) {
        // props.onCryptoSelected(coin)
        
        // window.location.href=`/coins/${coin.id}`;
        history.push(`/coins/${coin.id}`);
    }

    function loadCryptoListCoins() {
        externalApi.coinsPaginated(100, 1).then(result => {
            setCryptoListCoins(result.data)
        });
    }


}




// CryptoList.propTypes = {
// todo
// };


export default CryptoList;