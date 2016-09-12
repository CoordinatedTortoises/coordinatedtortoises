class Exchanges extends React.Component {

  componentDidMount() {
    window.updateExchangeRates();
    setTimeout(function(){
      window.updateExchangeRates();
    }, 1000 * 60 * 15);
  }

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
