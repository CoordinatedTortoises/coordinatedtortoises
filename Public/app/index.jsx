//Top level REACT app file!

var crypt = function() {};
//var crypto = crypt;

//Render all of our react components to the dom
ReactDOM.render(<App crypto={crypt}/>, document.getElementById('app'));

//Pass in top level props above