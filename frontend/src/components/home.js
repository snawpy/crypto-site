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
import Widgets from './widgets';
// Components Modals
import Register from './register';
import Login from './login';
import Search from './search';
// Logic
// import * as api from '../logic/api';
import * as externalApi from '../logic/external-api';
import * as cookies from '../logic/cookies';

const page = {
    profile: 0,
    cryptoList: 1,
    password: 2,
    deleteAccount: 3,
    cryptoViewer: 4,
    widget: 5
}

const Home = props => {

    const [displayMode, setDisplayMode] = useState(page.cryptoList);

    const [loggedIn, setLoggedIn] = useState(false);
    const [searchCoins, setSearchCoins] = useState(null); 
    const [cryptoListCoins, setCryptoListCoins] = useState(null); 

    const [selectedCrypto, setSelectedCrypto] = useState([]);

    useEffect(() => {

        if (cookies.getUserToken()) {
            setLoggedIn(true);
        }

        loadCryptoListCoins();

        setInterval(() => {
            loadCryptoListCoins();
        }, 60000);

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
            {renderNavBars()}
            {renderPages()}
            {renderModals()}
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

    function renderPages() {
        return (
            <React.Fragment>
                {displayMode === page.profile && 
                    <Profile display={displayMode === page.profile} />}

                {displayMode === page.password && 
                    <Password />}

                {displayMode === page.deleteAccount &&
                    <DeleteAccount />}   

                <CryptoList 
                    display={displayMode === page.cryptoList}
                    coins={cryptoListCoins}
                    onCryptoSelected={(coin) => onCryptoSelected(coin)} />

                <CryptoViewer
                    display={displayMode === page.cryptoViewer} 
                    coin={selectedCrypto}/>

                {/* {(displayMode === page.widget) &&
                    <Widgets 
                        selectedCrypto={selectedCrypto}
                    />
                } */}
            
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

    // Initialise -------------------------------------------------------------------
    function loadCryptoListCoins() {
        externalApi.coinsPaginated(100, 1).then(result => {
            console.log(result);
            setCryptoListCoins(result.data)
        });
    }

    function loadSearchCoins() {
        externalApi.allCoins().then(result => {
            // to do update checks
            if (result && result.ok && result.data) {
                setSearchCoins(result.data.coins);
            }
            else {
                //todo: do something here to let user know whats happening
                console.log("error loading coins");
            }
        })
        .catch(error => {
            console.log("error occured");
            console.log(error);
            // todo:
            // update site to let user know somethings went wrong
        });
    }

    // Events ------------------------------------------------------------------------

    function onCryptoSelected(coin) {

        // externalApi.coinPrice(coin.id, ["usd"]).then(result => {
        //     console.log(result);
        // })

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