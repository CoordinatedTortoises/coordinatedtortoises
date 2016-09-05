class App extends React.Component {
  constructor(props) {

    console.log(props);
    //Short hand for calling React.component.call(props)
    super(props);


    this.state = {
      //Put states that change in here

    };
  }

  //Define class methods here. A couple ones used in the sprint were rendering and lifecycle events
  //render is necessary to display the JSX supplied to the DOM!
  //componenetDidMount is called once for every

  logout() {}

  savePrefs() {}

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
          <NavBar logout={this.logout} savePrefs={this.savePrefs} />
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