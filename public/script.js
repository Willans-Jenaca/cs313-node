$(document).ready(() => {
  $('#btnAjax').click(calc);
});

async function calc() {
  let op1 = $('#op1').val();
  let op = $('#operator').val();

  let data = await fetch(`/math_service/${op}/${op1}`, {
    method: 'GET',
  });
  let result = await data.json();
  $('#spnResult').text(
    `The cost of shipping ${result.op1} ounces by ${result.op} is $${
      result.result
    }.`,
  );
}

// source: http://jsfiddle.net/9TP3e/
$('#op1').on('keydown keyup', function(e){
    if ($(this).val() > 13 
        && e.keyCode != 46 // delete
        && e.keyCode != 8 // backspace
    ){
        e.preventDefault();
        $(this).val(13);
        $(this).addClass('maxQuantity').focus();
    } else{
        $(this).removeClass("maxQuantity");
        $(this).attr("placeholder", "0");    
    }
});


$(document).ready(function () {
       getTweetData();
    });

$(document).ready(() => {
  $('#tweetAjax').click(getTweetData);
});

 async function getTweetData() {
   
    let data = await fetch(`/home`, {
    method: 'GET',
  });
  let result = await data.json();


  var tweetData = [];
  // loop through followers
    result.timeline.forEach(function(text) {
        tweetData.push(text);
    });

    var resultList = $("#tweetResult");
    resultList.empty();

    for (var i = 0; i < tweetData.length; i++) {
      var tweetText = tweetData[i].text;
      resultList.append("<p>" + tweetText + "</p></br>");
    }
}






