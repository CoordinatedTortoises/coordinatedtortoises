class Exchanges extends React.Component {

  //When mounting, it gets the exchange rates from the server
  componentDidMount() {
    window.updateExchangeRates();
    setTimeout(function(){
      window.updateExchangeRates();
    }, 1000 * 60 * 15);
  }

  // Renders a very simple panel that will contain the exchange rate
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Exchange Rates</div>
        <div className="panel-body exRates"></div>
      </div>
    );
  }

};

window.Exchanges = Exchanges;
