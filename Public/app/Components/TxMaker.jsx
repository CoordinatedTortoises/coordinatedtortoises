class TxMaker extends React.Component {
  //Upon render, it adds a click handler to a button
  componentDidMount() {
    $('.sendTx').on('click', function(){
      //Empties out previous results from the last transaction.
      $('#results').empty();
      var data = {};
      //The data is what we're sending to the server
      var shouldSend = true;
      //Should Send is only true if we end up with valid data to send
      
      //If the transaction id is empty, we can't send it, so it adds an error class to that input
      if($('#inputTxId').val() !== ''){
        data['txId'] = $('#inputTxId').val();
        $('#itiDiv').removeClass('has-error');
      } else {
        shouldSend = false;
        $('#itiDiv').addClass('has-error');
      }
      //If the transaction output is empty, we can't send it, so it adds an error class to the output field
      if($('#output').val() !== ''){
        data['output'] = $('#output').val();
        $('#oDiv').removeClass('has-error');
      } else {
        shouldSend = false;
        $('#oDiv').addClass('has-error');
      }

      //Tells us whether or not the WIF key is already encrypted
      data['EncryptKey'] = $('#shouldEnc').is(':checked');

      //Does the same thing as above
      if($('#privKey').val() !== ''){
        data['privKey'] = $('#privKey').val();
        $('#pkDiv').removeClass('has-error');
      } else {
        shouldSend = false;
        $('#pkDiv').addClass('has-error');
      }

      //I couldn't make it so the amount field would turn red if not filled, so I set to 0 as a default
      data['amount'] = $('#amount').val() === '' ? $('#amount').val() : 0;
      

      //If it's ok to send the data, it sends it to the server and builds it and pushes it to the blockchain
      if(shouldSend){ 
        $.post('http://localhost:3000/txmake', data, function(tx){ 
          $('#results').append('<span class="bg-success">' + tx + '</span>');
        });
      } else {
        $('#results').append('<span class="bg-danger">Please Fill out All Fields</span>');
      }
    });
  }

  //Renders a bunch of forms and a button to send them
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">Make Transactions</div>
          <div className="panel-body">
            <div className="form-group" id='itiDiv'>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputTxId" placeholder="Input Tx ID"></input>
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

//Sets Transaction maker to the window as TxMaker
window.TxMaker = TxMaker;