class Exchanges extends React.Component {
  constructor(props) {

    //Short hand for calling React.component.call(props)
    super(props);


    //State defaults
    this.state = {

      currency: {
        text: 'Currency: BTC',
        val: 'BTC'
      },
      resolution: {
        text: 'Resolution: all',
        val: 'all'
      },
      exchange: {
        BTC: {
          last: 1,
          symbol: 'BTC'
        }
      },
      synced: false
    };
  }
  //When mounting, it gets the exchange rates from the server
  

  componentDidMount() {
    $('.ratePref').on('click', function(data) {
      $('.currdata').parent().show();
      var selected = $(data.target).text();
      $('#selectedRates').text(selected);
      $('#selectedRates').append('<span class="caret"></span>');
      selected = selected.slice(selected.indexOf('(') + 1, selected.indexOf(')'));
      $('.currdata').each(function(index, elem){
        var query = $(elem).text();
        if(selected !== query.slice(query.indexOf('(') + 1, query.indexOf(')'))){
          $(elem).parent().hide();
        }
      }); 
    });
    $('.noPref').on('click', function(){
      $('.currdata').parent().show();
    });
    window.updateExchangeRates();
    setInterval(function(){
      console.log('updated exchange rates');
      window.updateExchangeRates();
    }, 1000 * 60 * 1);
  }

  // Renders a very simple panel that will contain the exchange rate
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Exchange Rates</div>
        <div className="panel-body exRates"></div>
        <div className="panel-footer">
        <div className="btn-group user-pref dropup">
        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="selectedRates">
          All<span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {_.map(currencies, (currency, key) => <li key={currency}><a className='ratePref'>{currency}</a></li>)}
          <li><a className='noPref'>All</a></li>
        </ul>
      </div>
        </div>
      </div>
    );
  }

};

window.Exchanges = Exchanges;
