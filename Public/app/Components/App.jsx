class App extends React.Component {
  constructor(props) {

    //Short hand for calling React.component.call(props)
    super(props);


    this.state = {
      prefs: {
        testData: 'blah blah blah',
        displayBitcoins: true
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


  logout(callback) {
    console.log('Logging out now');

    $.ajax({
      url: 'http://localhost:3000/logout',
      method: 'GET',
      success: (data) => callback(data),
      error: (error) => console.log('An error occurred!: ', error)
    });
  }

  savePrefs(callback) {
    console.log('Saving prefs now');

    var context = this;
    debugger;

    $.ajax({
      url: 'https://localhost:3000/users/preferences',
      method: 'POST',
      data: {
        prefs: JSON.stringify(this.state.prefs)
      },
      success: (data) => callback(data),
      error: (error) => console.log('An error occurred!: ', error)
    });
  }

  serverReqs() {}



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
          <Main />
        </div>
      </div>



    );
  }


}


//ES6 makes you expose things to the window, similar to in Node
window.App = App;