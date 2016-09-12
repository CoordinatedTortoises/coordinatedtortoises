class TxMaker extends React.Component {

  componentDidMount() {
    $('.sendTx').on('click', function(){
      $('#results').empty();
      var data = {};
      var shouldSend = true;
      if($('#inputTxId').val() !== ''){
        data['txId'] = $('#inputTxId').val();
        $('#itiDiv').removeClass('has-error');
      } else {
        shouldSend = false;
        $('#itiDiv').addClass('has-error');
      }
      if($('#output').val() !== ''){
        data['output'] = $('#output').val();
        $('#oDiv').removeClass('has-error');
      } else {
        shouldSend = false;
        $('#oDiv').addClass('has-error');
      }

      data['EncryptKey'] = $('#shouldEnc').is(':checked');

      if($('#privKey').val() !== ''){
        data['privKey'] = $('#privKey').val();
        $('#pkDiv').removeClass('has-error');
      } else {
        shouldSend = false;
        $('#pkDiv').addClass('has-error');
      }

      data['amount'] = $('#amount').val() || 0;
      if(shouldSend){ 
        $.post('http://localhost:3000/txmake', data, function(tx){ 
          $('#results').append('<span class="bg-success">' + tx + '</span>');
        });
      } else {
        $('#results').append('<span class="bg-danger">Please Fill out All Fields</span>');
      }
    });
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Make Transactions</div>
          <div className="panel-body">
            <div className="form-group" id='itiDiv'>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputTxId" placeholder="Input Tx Id"></input>
              </div>
            </div>
            <div className="form-group" id='oDiv'>
              <div className="col-sm-10">
                <input type='text' className="form-control" id='output' placeholder='Output Address'></input>
              </div>
            </div>
            <div className="form-group" id='pkDiv'>
              <div className="col-sm col-sm-10">
                <input type='password' className="form-control has" id='privKey' placeholder='WIF Private Key'></input>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <div className="checkbox">
                  <input type="checkbox" id="shouldEnc"></input>Encrypt Key?
                </div>
              </div>
            </div>
            <div className="form-group">
                <input type="Number" id="amount" placeholder="Amount"></input>
            </div>
            <center>
              <button className="btn btn-primary sendTx">Make Tx</button>
              <div id='results'>
              </div>
            </center>
        </div>
      </div>
    );
  }

};

window.TxMaker = TxMaker;