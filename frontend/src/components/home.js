// React
import React, { useState, useEffect } from "react";
// Component Pages
import Profile from './account';
import CryptoList from './crypto-list';
import CryptoViewer from './crypto-viewer';
import Password from './password';
import DeleteAccount from './delete-account';
// Components
import NavBarTop from './navigation/nav-bar-top';
import NavBarSide from './navigation/nav-bar-side';
// Components Modals
import Register from './register';
import Login from './login';
import Search from './search';
// Logic
// import * as api from '../logic/api';
import * as api from '../logic/api';
import * as cookies from '../logic/cookies';

import { BrowserRouter as Router, Route, Switch, useLocation, Redirect } from "react-router-dom"; 

const page = {
    profile: 0,
    cryptoList: 1,
    password: 2,
    deleteAccount: 3,
    cryptoViewer: 4,
    widget: 5
}

// react router stuff
// https://www.youtube.com/watch?v=EmUa_tcSM-k
// https://reactrouter.com/web/example/url-params


const Home = props => {

    const [displayMode, setDisplayMode] = useState(page.cryptoList);

    const [loggedIn, setLoggedIn] = useState(false);
    const [searchCoins, setSearchCoins] = useState(null); 

    const [selectedCrypto, setSelectedCrypto] = useState([]);

    useEffect(() => {

        if (cookies.getUserToken()) {
            setLoggedIn(true);
        }

        loadSearchCoins();

    }, []);

    // useEffect(() => {
        // if (loggedIn) {
            //todo fetch user data
            // loadUserData()
        // }
    // }, [loggedIn])

    return (
        <React.Fragment>
            <Router>
                {renderNavBars()}
                {renderPages()}
                {renderModals()}
            </Router>
        </React.Fragment>
    );

    // Renders ------------------------------------------------------------------------ 

    function renderNavBars() {
        return (
            <React.Fragment>
                <NavBarTop
                    loggedIn={loggedIn}
                    onSignOut={() => onSignOut()}
                    onSetDisplayMode={(value) => setDisplayMode(value)}
                    page={page}
                    displayMode={displayMode}
                />

                <NavBarSide 
                    loggedIn={loggedIn}
                    onSignOut={() => onSignOut()}
                    onSetDisplayMode={(value) => setDisplayMode(value)}
                    page={page}
                    displayMode={displayMode}
                />
            </React.Fragment>
        )
    }

    function renderModals() {
        return (
            <React.Fragment>                
                <Login
                    setLoggedIn={setLoggedIn} />     
                       
                <Register />
                
                <Search 
                    coins={searchCoins}
                    onCryptoSelected={(coin) => onCryptoSelected(coin)} />
            </React.Fragment>
        )
    }

    function renderPages() {
        // console.log(loggedIn);
        return (
            <React.Fragment>            
                    <Switch>

                        <Route exact path="/">
                            <CryptoList onCryptoSelected={(coin) => onCryptoSelected(coin)} />
                        </Route>

                        <Route exact path="/coins/:coin">
                            <CryptoViewer coin={selectedCrypto} />
                        </Route>

                        <Route exact path="/account">
                            {loggedIn ? <Profile loggedIn={loggedIn}/> : <div>hehe</div>}
                            {/* {!loggedIn &&                             
                                <CryptoList
                                    coins={cryptoListCoins}
                                    onCryptoSelected={(coin) => onCryptoSelected(coin)} />} */}
                        </Route>

                        <Route exact path="/password">                            
                            {loggedIn && <Password loggedIn={loggedIn}/>}
                            {!loggedIn &&                             
                                <CryptoList onCryptoSelected={(coin) => onCryptoSelected(coin)} />}
                        </Route>

                        <Route exact path="/delete-account">                            
                            {loggedIn && <DeleteAccount loggedIn={loggedIn}/>}
                            {!loggedIn &&                             
                                <CryptoList onCryptoSelected={(coin) => onCryptoSelected(coin)} />}
                        </Route> 


                    </Switch>

            </React.Fragment>
        )
    }

    // Initialise -------------------------------------------------------------------

    function loadSearchCoins() {

        api.getAllCrypto().then(result => {
            if (result && result.ok && result.data) {
                setSearchCoins(result.data.coins);
            }
            else {
                //todo: do something here to let user know whats happening
                console.log("error: Home > api.getAllCrypto()");
                console.log("result:");
                console.log(result);
            }
            
        })
        .catch(error => {
            console.log("Catch: Home > api.getAllCrypto()");
            console.log(error);
            // todo:
            // update site to let user know somethings went wrong
        });

    }

    // Events ------------------------------------------------------------------------

    function onCryptoSelected(coin) {

        setSelectedCrypto(coin);
        setDisplayMode(page.cryptoViewer);

    }

    function onSignOut() {
        cookies.deleteUserToken();
        setLoggedIn(false);

        setDisplayMode(page.cryptoList);

        M.toast({
            html: "Signed Out!",
            classes: "rounded"
        });
    } 

    function loadUserData() {
        return;
    }


} 










export default Home;