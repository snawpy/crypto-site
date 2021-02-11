// React
import React, { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
// Logic
import * as utils from '../logic/utils';
import * as api from '../logic/api';
import * as externalApi from '../logic/external-api';
// Materialize
import M from 'materialize-css';


const Search = props => {

    const searchModalElement = useRef(null);
    const mInstance = useRef(null);
    const searchRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCoins, setFilteredCoins] = useState([]);
    

    useEffect(() => {
    
        if (searchModalElement) {
            mInstance.current = M.Modal.init(searchModalElement.current, {
                onOpenEnd: () => onOpen(),
                onCloseEnd: () => onClose()
            });
        }

    }, [])

    useEffect(() => {

        if (searchTerm && props.coins) {
            filterCoins();
        }

        // monitor allCoins change so updates results incase user starts and stops typing before data loads 
    }, [searchTerm, props.coins]);

    // Renders ------------------------------------------------------------------------    

    return (
        <div id="modal-search" className="modal" ref={searchModalElement}>
            <div className="modal-content">
                <div className="input-field custom-outlined">
                    <input id="search-crypto" type="text" autoComplete="off"  value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} ref={searchRef}></input>
                    <label htmlFor="search-crypto">Search for your coin</label>
                    {renderFilteredCoins()}
                </div>
            </div>
        </div>
    )

    function renderFilteredCoins() {

        if (props.coins && filteredCoins.length > 0) {

            const coins = filteredCoins.map(coin => renderCoin(coin));

            return (
                <ul className="search-result-list collection">
                    {coins}
                </ul>
            );
        }
        else if (!props.coins && searchTerm) {
            return renderLoading();
        }

        return null;
    }

    function renderCoin(coin) {
        return (
            <li className="search-result-coin btn-large waves-effect"  key={coin.id} onClick={() => onCryptoSelected(coin)}>
                <img src={coin.thumb} alt="" className="circle"></img> {coin.name} - {coin.symbol}                
            </li>
        );
    }

    function renderLoading() {
        return ( 
            <div>
                Loading Data..
            </div>
        )
    }

    // Functions  ------------------------------------------------------------------------   

    function filterCoins() {
        const searchTermFormatted = searchTerm.trim().toLowerCase();      
        const filteredResults = [];
        const addedCoin = new Set();

        if (props.coins) {
            for (let coin of props.coins) {                
                if (coin.market_cap_rank !== null && (coin.name.toLowerCase().startsWith(searchTermFormatted) || coin.symbol.toLowerCase().startsWith(searchTermFormatted))) {
                    filteredResults.push(coin);
                    addedCoin.add(coin);
                }
                if (filteredResults.length >= 10) {
                    break;
                }
            }
            if (filteredResults.length < 10) {
                for (let coin of props.coins) {                
                    if (!addedCoin.has(coin) && coin.market_cap_rank !== null && (coin.name.toLowerCase().includes(searchTermFormatted) || coin.symbol.toLowerCase().includes(searchTermFormatted))) {
                        filteredResults.push(coin);
                    }
                    if (filteredResults.length >= 10) {
                        break;
                    }
                }
            }
            setFilteredCoins(filteredResults);
        }

    }

    // Events ------------------------------------------------------------------------   

    function onOpen() {
        if (searchRef && searchRef.current) {
            searchRef.current.focus();            
        }
    }
    function onClose() {
        setSearchTerm('');
        setFilteredCoins([]);
    }

    function onCryptoSelected(coin) {
        // todo: consider adding loading state somewhere or move into then
        mInstance.current.close();

        //to add:
        // props.setLoad(true)
        
        props.onCryptoSelected(coin);
    }


}

// todo
// Search.PropTypes = {
// };

export default Search;