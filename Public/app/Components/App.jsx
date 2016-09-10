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
        test: 'Resolution: 10min',
        val: 10
      },
      synced: false
    };
  }

  //Define class methods here. A couple ones used in the sprint were rendering and lifecycle events
  //render is necessary to display the JSX supplied to the DOM!
  //componenetDidMount is called once for every

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

  componentDidMount() {
    console.log('It mounted');
    this.props.graph.init();
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

  getPrefs() {
    console.log('Saving prefs now', this.state);

    var context = this;

    $.ajax({
      url: 'http://localhost:3000/users/preferences',
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

    //Pass the state into our change axis function from dataStream.js
    this.props.
    console.log(curr);
  }

  resHandler(res) {
    console.log(res);
  }



  render() {
    return (
      //Write JSX here, and passing down important props, like top level methods
      //Components:
        //Side bar nav
          //Save Prefs
          //LogOut
        //Main view
          //Graph 1
          //Settings for it

          //Props are given as attributes
      <div className="target">
        <div className="col-md-4">    
          <NavBar logout={this.logout} savePrefs={this.savePrefs.bind(this)} synced={this.synced.bind(this)} />
        </div>
        <div className="col-md-8">    
          <Main currencyState={this.state.currency.text} resState={this.state.resolution.text}. currHandler={this.currencyHandler} resHandler={this.resHandler}/>
        </div>
      </div>
    );
  }


}


//ES6 makes you expose things to the window, similar to in Node
window.App = App;