import * as requests from './requests';


// Coin Lists

// TO BE REMOVED ---------
export function allCoins() {
    // what coingecko uses on their own site, can't find this in api docs though, returns obj very different layout to other endpoints
    // seems best ordered result and all coins - REMOVE AS STOPS WORKING AND ISNT FULLY SUPPORTED
    return requests.GetAnonymous('https://api.coingecko.com/api/v3/search?locale=en');
}

export function coinsPaginated(coinsPerPage, page) {
    // can pass in single coin, returns decent info
    // max 250 per page
    return requests.GetAnonymous(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${page}&sparkline=false`);
}

export function allCoinsBasic() {
    return requests.GetAnonymous('https://api.coingecko.com/api/v3/coins/list');
}


// Single Coin

export function coinInfoAdvance(coinId, marketData=true, communityData=false, developerData=false, tickers=false) {
    return requests.GetAnonymous(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=${tickers}&market_data=${marketData}&community_data=${communityData}&developer_data=${developerData}&sparkline=false`
    );
}

// to be removed maybe? can just use advance for everything
export function coinPricesForChart(coinId) {
    return requests.GetAnonymous(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=7`);
}