"use strict";
function fetchLight() { //Fetching safeLight API
fetch("https://api.coingecko.com/api/v3/coins/safelight?tickers=false&market_data=true&developer_data=false&sparkline=false") 
    .then(response => {
    return response.json();
    })
    .then(responseData => {
        let safeLightPrice = parseFloat(responseData.market_data.current_price.usd).toFixed(9); // Prevents conversion to scientific formula
        let innerLightMessage = document.getElementById("safeLight");
        let lightProfit = document.getElementById("safeLightProfit")
        var lightInvestedAt = 0.00000001;
        if (safeLightPrice == 1e-9) { //Price is not displayed right on API side, even if to convert it to number it will show only 0.00000001, and not show anything after
            innerLightMessage.innerHTML = "SafeLight current price is " + safeLightPrice;
            lightProfit.innerHTML = "Price is still too low to calculate profit";
        }
        else if (safeLightPrice == lightInvestedAt) {
            innerLightMessage.innerHTML = "SafeLight current price is " + safeLightPrice;
            lightProfit.innerHTML = "No profit"
        }
        else {
            innerLightMessage.innerHTML = "SafeLight current price is " + safeLightPrice;

            if (safeLightPrice > lightInvestedAt) {
            let profitLightCalculator = Math.floor((safeLightPrice / lightInvestedAt - 1) *100);
            lightProfit.innerHTML = "My profit is " + profitLightCalculator + " %"} 
            else {
            let lossLightCalculator = Math.floor((lightInvestedAt / safeLightPrice - 1) *100);
            lightProfit.innerHTML = "My loss is " + lossLightCalculator + " %";
            }
        }
    })
}

function fetchBTC(){ //Fetching BTC API
fetch("https://api.coingecko.com/api/v3/coins/safebtc?tickers=false&market_data=true&developer_data=false&sparkline=false") //Fetching safeLight API
    .then(response => {
    return response.json();
    })
    .then(responseData => {
        let safeBTCPrice = parseFloat(responseData.market_data.current_price.usd).toFixed(9); // Prevents conversion to scientific formula
        let innerBTCMessage = document.getElementById("safeBTC");
        var BTCInvestedAt = 0.00000011;
        let safeBTCProf = document.getElementById("safeBTCProfit")
        if (safeBTCPrice == 1e-8 || safeBTCPrice == 1e-9) { //Price is not displayed right on API side, even if to convert it to number it will show only 0.00000001, and not show anything after
            innerBTCMessage.innerHTML = "Price is still too low to calculate";
        }
        else if (safeBTCPrice == BTCInvestedAt) {
            safeBTCProf.innerHTML = "No profit"
        }
        else {
        innerBTCMessage.innerHTML = "SafeBTC current price is " + safeBTCPrice;

            if (safeBTCPrice > BTCInvestedAt) {
            let profitBTCCalculator = Math.floor((safeBTCPrice / BTCInvestedAt) *100);
            safeBTCProf.innerHTML = "My profit is " + profitBTCCalculator + " %"}
            else {
            let lossBTCCalculator = Math.floor((BTCInvestedAt / safeBTCPrice - 1)*100);
            safeBTCProf.innerHTML = "My loss is " + lossBTCCalculator + " %"
            }
        }

    })
}
window.addEventListener("load", function(){ // runs api calls every 3 sec
    const interval = 3000;
    this.setInterval(fetchLight, interval);
    this.setInterval(fetchBTC, interval);
})
