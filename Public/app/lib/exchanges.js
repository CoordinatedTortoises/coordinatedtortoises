//Exchange data is just the exchange rate data
window.exchangeData = {};


//Update exchangeRates queries our server for the current exchange rate data and appends it within the panel for transactions.
//It's called every minute by the componentDidMount of exchanges.jsx
var updateExchangeRates = function(){
  $('.exRates').empty();
  $.ajax({
      url: 'http://localhost:3000/exchange',
      method: 'GET',
      success: (data) => {
        $('exRates').empty();
        var rates = JSON.parse(data);
        $('.exRates').append('<h3 class="text-center">Rates per 1 Ƀ</h3><br>');
        $('.exRates').append('<table class="table exData"><tr><th>Currency</th><th>Buy Rate</th><th>Sell Rate</th></table>');

        for (var currency in rates) {
          var currencyData = $('<tr><th class="currdata">' + currency + ' (' + rates[currency]['symbol'] + ')' + '</th><th>'+ rates[currency]['buy'] +  '</th><th>' + rates[currency]['sell'] + '</th></tr>');
          $('.exData').append(currencyData);
        }
      },
      error: (error) => console.log('An error occurred!: ', error)
    });
}

//Adds it to the window
window.updateExchangeRates = updateExchangeRates;

