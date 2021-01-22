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

    // console.log(props.allCoins);

    

    useEffect(() => {
        if (searchModalElement) {
            mInstance.current = M.Modal.init(searchModalElement.current, {
                onOpenEnd: () => onOpen()
            });
        }

    }, [])

    useEffect(() => {
        if (searchTerm) {
            filterCoins();
        }

    }, [searchTerm])



    return (
        <div id="modal-search" className="modal" ref={searchModalElement}>
            <div className="modal-content">
                {/* <h4>Search</h4> */}
                <div className="input-field custom-outlined">
                    {/* <input id="search-crypto" type="text" autoFocus={true} value={searchTerm} onChange={(event) => filterCoins(event.target.value)} ref={searchRef}></input> */}
                    <input id="search-crypto" type="text" autoFocus={true} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} ref={searchRef}></input>
                    <label htmlFor="search-crypto">Search</label>

                    {renderFilteredCoins()}


                </div>
            </div>
        </div>
    )

    function renderFilteredCoins() {
        
        if (filteredCoins.length > 0) {

            const coins = filteredCoins.map(coin => renderCoin(coin));

            return (
                <div className="search-result-list collection">
                    {coins}
                </div>
            );
        }

        return null;
    }

    function renderCoin(coin) {
        return (
            <a className="search-result-coin collection-item" href="#!" key={coin.id}>
                <img src={coin.thumb} alt="" class="circle"></img> {coin.name} - {coin.symbol}
            </a>
        );
    }

    function filterCoins() {

        const searchTermFormatted = searchTerm.trim();        
        const filteredResults = [];

        for (const coin of props.allCoins) {
            if (coin.symbol.toLowerCase().includes(searchTermFormatted) || coin.name.toLowerCase().includes(searchTermFormatted)) {
                filteredResults.push(coin);
            }
            if (filteredResults.length >= 10) {
                break;
            }
        }

        setFilteredCoins(filteredResults);
    }

    function onOpen() {
        if (searchRef && searchRef.current) {
            searchRef.current.focus();            
        }
    }


}


export default Search;