class Transactions extends React.Component {

  componentDidMount() {
    $('.search').on('click', function(){
      //   $.ajax({
      //   url: 'http://localhost:3000/tx',
      //   method: 'GET',
      //   dataType: 'json',
      //   data: JSON.stringify($('.address').val()),
      //   success: (data) => {
      //     console.log(data);
      //   },
      //   error: (error) => console.log('An error occurred!: ', error)
      // });
      $.get('http://localhost:3000/tx', $('.address').val(), function(tx){
        $('.unspent').empty();
        // $('.res').append('<h3 className="text-center"> Unspent:</h3>');
        // $('.res').append('<table class="table" id="unspent"></table>');
        $('.unspent').append('<tr><th>Trans Hash</th><th>Value</th><th># Of Confirmations</th></tr>');
        var trans = JSON.parse(tx);
        var txUO = trans.unspent_outputs;
        var total = 0;
        for (var unspent in txUO) {
          $('.unspent').append('<tr><td><small>' + txUO[unspent]['tx_hash'] + '</small></td><td>' + txUO[unspent]['value'] + ' Satoshi </td><td>' + txUO[unspent]['confirmations'] + '</td></tr>');
          total += txUO[unspent]['value'];
        };
        $('.unspent').append('<tr><td>NA</td><th>' + total + ' Total Satoshi' + '</th><td>NA</td></tr>');
      })
    });
  }

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