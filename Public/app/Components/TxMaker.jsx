class TxMaker extends React.Component {

  componentDidMount() {
    $('.sendTx').on('click', function(){
      var data = {};
      data['txId'] = $('#inputTxId').val();
      data['output'] = $('#output').val();
      data['EncryptKey'] = $('#shouldEnc').is(':checked');
      data['privKey'] = $('#privKey').val();
      // $.get('http://localhost:3000/tx', $('.address').val(), function(tx){
      //   $('.unspent').empty();
      //   // $('.res').append('<h3 className="text-center"> Unspent:</h3>');
      //   // $('.res').append('<table class="table" id="unspent"></table>');
      //   $('.unspent').append('<tr><th>Trans Hash</th><th>Value</th><th># Of Confirmations</th></tr>');
      //   var trans = JSON.parse(tx);
      //   var txUO = trans.unspent_outputs;
      //   var total = 0;
      //   for (var unspent in txUO) {
      //     $('.unspent').append('<tr><td><small>' + txUO[unspent]['tx_hash'] + '</small></td><td>' + txUO[unspent]['value'] + ' Satoshi </td><td>' + txUO[unspent]['confirmations'] + '</td></tr>');
      //     total += txUO[unspent]['value'];
      //   };
      //   $('.unspent').append('<tr><td>NA</td><th>' + total + ' Total Satoshi' + '</th><td>NA</td></tr>');
      // });
    });
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Make Transactions</div>
        <div className="panel-body">
            <div className="form-group">
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputTxId" placeholder="Input Tx Id"></input>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-10">
                <input type='text' className="form-control" id='output' placeholder='Output Address'></input>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm col-sm-10">
                <input type='password' className="form-control" id='privKey' placeholder='Private Key'></input>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <div className="checkbox">
                  <input type="checkbox" id="shouldEnc"></input>Encrypt Key?
                </div>
              </div>
              <button className="btn btn-primary sendTx">Make Tx</button>
            </div>
        </div>
      </div>
    );
  }

};

window.TxMaker = TxMaker;