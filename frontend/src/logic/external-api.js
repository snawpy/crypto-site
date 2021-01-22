import * as requests from './requests';

export function allCoins(coinsPerPage, page) {


    // all coins lame order
    // return requests.GetAnonymous('https://api.coingecko.com/api/v3/coins/list');

    // what coingecko uses on their own site, can't find this in api docs though, returns obj very different layout to other endpoints
    // seems best ordered result and all coins
    return requests.GetAnonymous('https://api.coingecko.com/api/v3/search?locale=en');

    // coinsPerPage = 250;
    // page = 3;
    // return requests.GetAnonymous(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${page}&sparkline=false`);
}