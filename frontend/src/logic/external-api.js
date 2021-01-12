import * as requests from './requests';

export function allCoins() {
//     return fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false").then(response =>{
//         return response.json();
//     });

    return requests.GetAnonymous("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false");
}