// React
import React from 'react';
import PropTypes from 'prop-types';
// Components
import CryptoChart from './crypto-chart';
import { useLocation, useParams } from "react-router-dom"; 


const CryptoViewer = (props) => {
    // console.log(props);
    const params = useParams();
    // console.log(params)

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
    }

    // const location = useLocation();
    // console.log(location);


    // console.log(hehe.coin);
    // console.log("nothing here m8");
    // return null;

    // return (
    //     <div>
    //         hehhe
    //     </div>
    // )




}


// CryptoViewer.propTypes = {
// todo
// };


export default CryptoViewer;