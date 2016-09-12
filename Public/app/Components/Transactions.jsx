class Transactions extends React.Component {
  // When the component renders, we add a click handler to the button
  componentDidMount() {
    
    $('.search').on('click', function(){
      //Makes a request to our own server and gets back the data from the address given by the user
      $.get('http://localhost:3000/tx', $('.address').val(), function(tx){
        $('.unspent').empty();
        // $('.res').append('<h3 className="text-center"> Unspent:</h3>');
        // $('.res').append('<table class="table" id="unspent"></table>');
        $('.unspent').append('<tr><th>Trans Hash</th><th>Value</th><th># Of Confirmations</th></tr>');
        var trans = JSON.parse(tx);
        var txUO = trans.unspent_outputs;
        var total = 0;
        //For every unspent transaction, we are going to add a row to the table and increase the total amount
        for (var unspent in txUO) {
          $('.unspent').append('<tr><td><small>' + txUO[unspent]['tx_hash'] + '</small></td><td>' + txUO[unspent]['value'] + ' ㋛</td><td>' + txUO[unspent]['confirmations'] + '</td></tr>');
          total += txUO[unspent]['value'];
        };
        //A row representing total Satoshis that you have
        $('.unspent').append('<tr><td>-</td><th>' + total + ' Total ㋛' + '</th><td>-</td></tr>');
      });
    });
  }

  //A very simple panel which contains a textfield which you paste an address into, and it finds all of the transactions to that address
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Transactions</div>
        <div className="panel-body">
        Find all transactions to an address
          <div className="form-group">
            <textarea className="form-control address" rows="2"></textarea>
            <button className="btn btn-primary search">Look Up</button>
          </div>
          <table className='table table-striped unspent'>
          </table>
        </div>
      </div>
    );
  }

};

window.Transactions = Transactions;