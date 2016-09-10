//ES6 makes you expose things to the window, similar to in Node

//Stateless components don't even have to be declared as a React Component, and ES6 syntax makes them look super clean
var Main = ({currencyState, resState, currHandler, resHandler}) => (
  <div className="panel panel-primary">
    <div className="panel-heading"> Current Trading Values</div>
    <div className="panel-body main-graph">
    </div>
    <div className="panel-footer">
      <div className="btn-group">
        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {currencyState}<span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a onClick={() => currHandler('BTC')}>Bitcoin (BTC)</a></li>
          <li><a onClick={() => currHandler('usd')}>US Dollars ($)</a></li>
          <li><a onClick={() => currHandler('jpy')}>Japanese Yen (¥)</a></li>
        </ul>
      </div>
      <div className="btn-group">
        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {resState}<span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          <li><a onClick={() => resHandler(1)}>1 min</a></li>
          <li><a onClick={() => resHandler(5)}>5 min</a></li>
          <li><a onClick={() => resHandler(10)}>10 min</a></li>
        </ul>
      </div>
    </div>
  </div>
);



window.Main = Main;