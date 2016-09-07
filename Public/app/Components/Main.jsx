//ES6 makes you expose things to the window, similar to in Node

//Stateless components and don't require brackets or a render function, thus ES6 syntax makes them look super clean
var Main = ({stream}) => (
  <div className="panel panel-primary">
    <div className="panel-heading"> Current Trading Values</div>
    <div className="panel-body main-graph">
    </div>
    <div className="panel-footer">Options:</div>
  </div>
);


window.Main = Main;