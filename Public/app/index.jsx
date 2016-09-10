//Top level REACT app file!

//var crypto = crypt;

var currencies = {

  'BTC': 'Bitcoin (BTC)',
  'USD': 'US Dollars ($)',
  'JPY': 'Japanese Yen (¥)',
  'HKD': 'Hong Kong Dollar (H$)',
  'CAD': 'Canadian Dollar (C$)',
  'NZD': 'New Zealand Dollar(N$)',
  'AUD': 'Australian Dollar (A$)',
  'CLP': 'Chilean Peso ($)',
  'GBP': 'British Pound (£)',
  'DKK': 'Danish Kroner (kr)',
  'CHF': 'Swiss Franc (CHF)',  
  'EUR': 'EU Euro (€)',
  'RUB': 'Russian Ruble (₽)',
  'PLN': 'Polish Zloty (zł)',
  'THB': 'Thai Bhat (฿)',
  'KRW': 'South Korean Won (₩)',
  'TWD': 'New Taiwan Dollar (NT$)'
};

ReactDOM.render(<App graph={window.graph} currencies={currencies}/>, document.getElementById('app'));

//Pass in top level props above