window.exchangeData = {};

var updateExchangeRates = function(){
  $.ajax({
      url: 'http://localhost:3000/exchange',
      method: 'GET',
      success: (data) => {
        var rates = JSON.parse(data);
        $('.exRates').append('<span>Rates per 1 Ƀ</span><br>');
        $('.exRates').append('<table class="table exData"><tr><th>Currency</th><th>Buy Rate</th><th>Sell Rate</th></table>');

        for (var currency in rates) {
          var currencyData = $('<tr><th>' + currency + '(' + rates[currency]['symbol'] + ')' + '</th><th>'+ rates[currency]['buy'] +  '</th><th>' + rates[currency]['sell'] + '</th></tr>');
          $('.exData').append(currencyData);
        }
      },
      error: (error) => console.log('An error occurred!: ', error)
    });
}

window.updateExchangeRates = updateExchangeRates;

