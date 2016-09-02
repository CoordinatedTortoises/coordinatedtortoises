//ES6 makes you expose things to the window, similar to in Node

//Stateless components don't even have to be declared as a React Component, and ES6 syntax makes them look super clean
var NavBar = ({logout, savePrefs}) => (
 <div class="btn-group-vertical" role="group" aria-label="...">
   <button onClick={savePrefs}>Save Your Preferences</button>
   <button onClick={logout}>Logout</button>
 </div>
);


window.NavBar = NavBar;