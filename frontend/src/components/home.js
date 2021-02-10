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

//materialize
// materialize seems to work, but might need to use css loader in babel when using live: https://stackoverflow.com/questions/35499842/how-to-use-materialize-css-with-react
// import M from 'materialize-css';



// https://www.freecodecamp.org/news/the-react-cheatsheet-for-2020/
// TODO NEXT:


    // Delete account page
    // Maybe move the delete button onto the personal information page
    // to easily clicked on the account button, add extra steps to avoid accidental deletion
    // Account button > Personal Info > Delete account button > moves to delete page (ask why deleting), tick box > press again > Modal confirmation > Confirm button



// profile page:
    // delete account
    // confirm email

// finish crypto list page
// FETCHN, CHECK IF JSON CAN BE PARSED, ALWAYS WANT TO RETURN A CONTENT, I CANT SET CONTENT TO NULL
// request-fetch - break every little check into seperate functions with names making it clear what they're doing
// move login into own component
// move registration into own component

// profile button
// ENDPOINT TO DELETE ACCOUNT
// update functions into components, too many render functions!
// useEffect: if logged status changes to true, load user data
// change tabs into a component
// make sure api only available over https on production (test with ngrok)
// email verification:
// request email verification on login attempt after register ?


// POLISHES TO DO AFTER:
// Register: 
    // error message if email already exists (already got this, but look into resposnes to maybe custom handle all scenarios)
    // expriment with view, seems we overiding in serializer vs in view, which is better?
    // register: if success, maybe make login modal appear right after or auto login
    // viery email account
    // add x in top right
    // toast color
    // custom invalid borderline, built in ones annoying! (remove "validate" from the input className)
// Login:
//     Forgot password (if account exists you will recieve email)
    // add x in top right
    // toast color
    // error if incorrect pw, dont let user know an account exists, force them to do forgot pw or account
    // custom invalid borderline, built in ones annoying! (remove "validate" from the input className, only annoying with modals, place valid or invalid manually)



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

        // will initialize all materialize components, but you cant pass in parameters using this or gain access to extra functionality
        // M.AutoInit();

        if (cookies.getUserToken()) {
            setLoggedIn(true);
        }

        // use for cryptoList (provides more data per coin)
        externalApi.coinsPaginated(100, 1).then(result => {
            console.log(result);
            setCryptoListCoins(result.data)
        });


        // forsearch
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

    }, []);

    useEffect(() => {
        if (loggedIn) {
            //todo fetch user data
            // console.log("user now logged");
            // loadUserData()
        }
    }, [loggedIn])

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