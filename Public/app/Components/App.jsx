class App extends React.Component {

  //What happens on instantiation
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
        text: 'Resolution: 10min',
        val: 'all'
      },
      exchange: {
        BTC: {
          last: 1
        }
      },
      synced: false
    };
  }

  //componenetDidMount is called once for the very first render
  componentDidMount() {
    console.log('It mounted: ', this.props);

    this.getPrefs((data) => {
      this.setState(data);
      this.props.graph.init(this.state);
    });
    //this.props.graph.init(this.state);
  }

  //Used to visually display a successful save
  synced() {
    this.setState({
      synced: true
    });

    console.log(setTimeout);

    setTimeout(function() {
      console.log(this.state);
      this.setState({
        synced: false
      });
    }.bind(this), 3000);
  }



  //AJAX Methods
  savePrefs(callback) {
    console.log('Saving prefs now', this.state);

    var context = this;

    $.ajax({
      url: 'http://localhost:3000/users/preferences',
      method: 'POST',
      data: JSON.stringify(this.state),
      success: (data) => callback(data),
      error: (error) => console.log('An error occurred!: ', error)
    });
  }



  getPrefs(callback) {
    console.log('Getting prefs now', this.state);

    var context = this;

    //This is a mock for simulating the AJAX call until its working

    callback({
      currency: {
        text: 'Currency: USD',
        val: 'USD'
      },
      resolution: {
        text: 'Resolution: all',
        val: 'all'
      },
      exchange: {
        BTC: {
          last: 660
        }
      },
      synced: false
    });

    //DONT DELETE THIS, WE NEED IT LATER *******************************
    //
    // $.ajax({
    //   url: 'http://localhost:3000/users/preferences',
    //   method: 'GET',
    //   success: (data) => callback(JSON.parse(data)),
    //   error: (error) => console.log('An error occurred!: ', error)
    // });
    //******************************************************************
  }



  getExchange(callback) {
    //use blockchain api to get most up to date exchange prices
    $.ajax({
      url: 'https://blockchain.info/ticker?cors=true',
      method: 'GET',
      success: (data) => callback(data),
      error: (error) => console.log('An error occurred!: ', error)
    });
  }

  currencyHandler(curr) {

    //change the state: triggers the button text to change
    this.setState({
      currency: {
        text: 'Currency: ' + curr,
        val: curr
      }
    });

    //get the current exchange rates, then pass to rescale
    this.getExchange((data) => {
      this.setState({
        exchange: data
      });
      this.props.graph.rescale(curr, data);
    });
    //this.props.graph.rescale(curr);
    console.log(this, curr);
  }

  resHandler(res) {
    console.log(this, res);

    this.setState({
      resolution: {
        text: 'Resolution: ' + res + 'min',
        val: res
      }
    });
  }



  render() {
    return (
      <div className="target">
        <div className="col-md-4">    
          <NavBar logout={this.logout} savePrefs={this.savePrefs.bind(this)} synced={this.synced.bind(this)} syncState={this.state.synced} />
        </div>
        <div className="col-md-8">    
          <Main currencies={this.props.currencies} currencyState={this.state.currency.text} resState={this.state.resolution.text} currHandler={this.currencyHandler.bind(this)} resHandler={this.resHandler.bind(this)}/>
        </div>
      </div>
    );
  }


}


//ES6 makes you expose things to the window, similar to in Node
window.App = App;