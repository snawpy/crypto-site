// React
import React from 'react';
import PropTypes from 'prop-types';


const CryptoList = (props) => {

    if (props.display && props.coins) {
        return (
            <div className="coin-list-container">
                {renderTable()}
            </div>
        )
    }

    return null;

    function renderTable() {

        const coins = props.coins.map(coin => renderCoin(coin));
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
                    <div onClick={() => props.onCryptoSelected(coin)} className="coin-list-coin-name-group">
                        <img src={coin.image} alt="" className="crypto-list-coin-image"></img>
                        {coin.name} <span className="coin-list-coin-symbol">{coin.symbol.toUpperCase()}</span>
                    </div>
                </td>
                <td>${coin.current_price.toLocaleString()}</td>
                <td>${coin.market_cap.toLocaleString()}</td>
                <td>${coin.total_volume.toLocaleString()}</td>
                <td>{coin.circulating_supply.toLocaleString()}</td>
            </tr>
        );
    }


}




// CryptoList.propTypes = {

// };


export default CryptoList;