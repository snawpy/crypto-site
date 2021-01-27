// React
import React, { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
// Logic
import * as utils from '../logic/utils';
import * as api from '../logic/api';
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
                onOpenEnd: () => onOpen()
            });
        }

    }, [])

    useEffect(() => {

        if (searchTerm && props.allCoins) {
            filterCoins();
        }

        // monitor allCoins change so updates results incase user starts and stops typing before data loads 
    }, [searchTerm, props.allCoins]);

    // Renders ------------------------------------------------------------------------    

    return (
        <div id="modal-search" className="modal" ref={searchModalElement}>
            <div className="modal-content">
                {/* <h4>Search</h4> */}
                <div className="input-field custom-outlined">
                    <input id="search-crypto" type="text" autoFocus={true} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} ref={searchRef}></input>
                    <label htmlFor="search-crypto">Search</label>

                    {renderFilteredCoins()}
                    {/* if props.coins empty. display something to let know still loading data */}

                </div>
            </div>
        </div>
    )

    function renderFilteredCoins() {

        if (props.allCoins && filteredCoins.length > 0) {

            const coins = filteredCoins.map(coin => renderCoin(coin));

            return (
                <div className="search-result-list collection">
                    {coins}
                </div>
            );
        }
        else if (!props.allCoins && filteredCoins.length > 0) {
            return renderLoading();
        }

        return null;
    }

    function renderCoin(coin) {
        return (
            <a className="search-result-coin collection-item" href="#!" key={coin.id} onClick={() => props.onCryptoSelected(coin)}>
                <img src={coin.thumb} alt="" className="circle"></img> {coin.name} - {coin.symbol}
            </a>
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

        if (props.allCoins) {
            for (let coin of props.allCoins) {                
                if (coin.market_cap_rank !== null && (coin.symbol.toLowerCase().includes(searchTermFormatted) || coin.name.toLowerCase().includes(searchTermFormatted))) {
                    filteredResults.push(coin);
                }
                if (filteredResults.length >= 10) {
                    break;
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


}


export default Search;