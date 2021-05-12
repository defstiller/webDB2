"use strict";
var apiKey = "fa839bf1-f24a-4f4e-8abe-daa228036d11";
function fetchLight() { //Fetching safeLight API
fetch("https://api.coingecko.com/api/v3/coins/safelight?tickers=false&market_data=true&developer_data=false&sparkline=false") 
    .then(response => {
    return response.json();
    })
    .then(responseData => {
        let safeLightPrice = responseData.market_data.current_price.usd;
        let innerLightMessage = document.getElementById("safeLight");
        var lightInvestedAt = 0.00000001;
        if (safeLightPrice == 1e-9) { //Price is not displayed right on API side, even if to convert it to number it will show only 0.00000001, and not show anything after
            innerLightMessage.innerHTML = "safeLight current price is " + safeLightPrice;
            innerLightMessage.innerHTML = "Price is still too low to calculate profit";
        }
        else if (safeLightPrice == lightInvestedAt) {
            innerLightMessage.innerHTML = "No profit"
        }
        else {
            innerLightMessage.innerHTML = "safeLight current price is " + safeLightPrice;

            if (safeLightPrice > lightInvestedAt) {
            let profitLightCalculator = Math.floor((safeLightPrice / lightInvestedAt - 1) *100);
            document.getElementById("safeLightProfit").innerHTML = "My profit is " + profitLightCalculator + " %"} 
            else {
            let lossLightCalculator = Math.floor((lightInvestedAt / safeLightPrice - 1) *100);
            document.getElementById("safeLightProfit").innerHTML = "My loss is " + lossLightCalculator + " %";
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
        let safeBTCPrice = responseData.market_data.current_price.usd;
        let innerBTCMessage = document.getElementById("safeBTC");
        var BTCInvestedAt = 0.00000011;
        if (safeBTCPrice == 1e-8 || safeBTCPrice == 1e-9) { //Price is not displayed right on API side, even if to convert it to number it will show only 0.00000001, and not show anything after
            innerBTCMessage.innerHTML = "Price is still too low to calculate";
        }
        else if (safeBTCPrice == BTCInvestedAt) {
            document.getElementById("safeBTCProfit").innerHTML = "No profit"
        }
        else {
        innerBTCMessage.innerHTML = "safeBTC current price is " + safeBTCPrice;

            if (safeBTCPrice > BTCInvestedAt) {
            let profitBTCCalculator = Math.floor((safeBTCPrice / BTCInvestedAt) *10);
            document.getElementById("safeBTCProfit").innerHTML = "My profit is " + profitBTCCalculator + " %"}
            else {
            let lossBTCCalculator = Math.floor((BTCInvestedAt / safeBTCPrice - 1)*100);
            document.getElementById("safeBTCProfit").innerHTML = "My loss is " + lossBTCCalculator + " %"
            }
        }

    })
}
window.addEventListener("load", function(){ // runs api calls every 3 sec
    const interval = 3000;
    this.setInterval(fetchLight, interval);
    this.setInterval(fetchBTC, interval);
})
