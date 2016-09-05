//ES6 makes you expose things to the window, similar to in Node

//Stateless components don't even have to be declared as a React Component, and ES6 syntax makes them look super clean
var NavBar = ({logout, savePrefs}) => (

  <div className="panel panel-primary">
    <div className="panel-heading">Crypto Currency Dashboard</div>
    <div className="panel-body">
      <div className="btn-group-vertical" role="group" aria-label="...">
        Try interacting with the ticker graphs on the right! In your account, you can customize your dashboard view any way you like, and save those preferences so that you see them each time you log in.
        <button className="btn btn-default" onClick={savePrefs}>Save Your Preferences</button>
        <button className="btn btn-default" onClick={logout}>Logout</button>
      </div>
    </div>
    <div className="panel-footer">Made at Hack Reactor by Nick, Pete, Clarabelle, and Julian</div>
  </div>

);


window.NavBar = NavBar;



