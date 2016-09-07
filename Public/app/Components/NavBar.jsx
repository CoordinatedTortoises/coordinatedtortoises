//ES6 makes you expose things to the window, similar to in Node

//Stateless components don't even have to be declared as a React Component, and ES6 syntax makes them look super clean

//This is a navbar which will be used on the side of our app to change preferences
//It has the title of our app, a button to save preferences to the database
//and a logout button
var NavBar = ({logout, savePrefs, synced}) => (

  <div className="panel panel-primary height-full">
    <div className="panel-heading"> Your Crypto-currency Dashboard</div>
    <div className="panel-body">
      <div className="btn-group-vertical" role="group" aria-label="...">
        <span className="text"> 
          Try interacting with the ticker graphs on the right! In your account, you can customize your 
          dashboard view any way you like, and save those preferences so that you see them each time you log in. 
        </span>
        <button className="btn btn-default" onClick={() => savePrefs(synced)}>Save Your Preferences</button>
        <button className="btn btn-default" onClick={logout}>Logout</button>
      </div>
    </div>
    <div className="panel-footer">
      Made at Hack Reactor by Nick, Pete, Clarabelle, and Julian
    </div>
  </div>

);


window.NavBar = NavBar;



