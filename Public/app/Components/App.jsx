//ES6 Version of react
class App extends React.Component {
  constructor(props) {

    //Short hand for calling React.component.call(props)
    super(props);
    //Sets the default state of the component
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
  //componenetDidMount is called once for every time the element is rendered and put onto the page

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
    //Sends a request to logout
    //This should also remove session tokens or oauth or something
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
    //Context binds the current instance of app so we can call it in the ajax call without worry
    debugger;
    //posts preferences to the database as a huge object
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
      //This will be called whenever we create an app in a jsx file
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


//ES6 exposing app to window to allow other scripts to access it, similar to in Node
window.App = App;