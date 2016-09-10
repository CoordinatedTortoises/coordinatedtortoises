class App extends React.Component {
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
      exchange: {},
      synced: false
    };
  }

  //Define class methods here. A couple ones used in the sprint were rendering and lifecycle events
  //render is necessary to display the JSX supplied to the DOM!
  //componenetDidMount is called once for every
  componentDidMount() {
    console.log('It mounted: ', this.props);

    //this.getPrefs(this.props.graph.init);
    this.props.graph.init();
  }

  synced() {
    this.setState({
      synced: true
    });

    setTimeout(3000, function() {
      this.setState({
        synced: false
      });
    }.bind(this));
  }




  savePrefs(callback) {
    console.log('Saving prefs now', this.state);

    var context = this;

    $.ajax({
      url: 'http://localhost:3000/users/preferences',
      method: 'POST',
      data: {
        prefs: JSON.stringify(this.state)
      },
      success: (data) => callback(data),
      error: (error) => console.log('An error occurred!: ', error)
    });
  }



  getPrefs(callback) {
    console.log('Getting prefs now', this.state);

    var context = this;

    $.ajax({
      url: 'http://localhost:3000/users/preferences',
      method: 'GET',
      success: (data) => callback(JSON.parse(data)),
      error: (error) => console.log('An error occurred!: ', error)
    });
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
          <NavBar logout={this.logout} savePrefs={this.savePrefs.bind(this)} synced={this.synced.bind(this)} />
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