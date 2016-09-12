//ES6 makes you expose things to the window, similar to in Node

//Stateless components don't even have to be declared as a React Component, and ES6 syntax makes them look super clean
var NavBar = ({logout, savePrefs, synced, syncState}) => (

  <div className="panel panel-primary height-full">
    <div className="panel-heading"> Your Crypto-currency Dashboard</div>
    <div className="panel-body">
      <TxMaker />
      <div className="btn-group-vertical" role="group" aria-label="...">
        <span className="text"> 
          Try interacting with the ticker graphs on the right! In your account, you can customize your 
          dashboard view any way you like, and save those preferences so that you see them each time you log in. 
        </span>
        <button className="btn btn-default" onClick={() => window.location = '/login'}>Logout</button>
        <button className="btn btn-default" onClick={() => savePrefs(synced)}>Save Your Preferences
          <span className={syncState ? 'label label-success' : 'hide'}>Success</span>
        </button>
      </div>
    </div>
    <div className="panel-footer">
      Made at Hack Reactor by Nick, Pete, Clarabelle, and Julian
    </div>
  </div>

);
//This is the navbar on the left side of the screen which contains the transaction maker and a way to save user preferences

window.NavBar = NavBar;



