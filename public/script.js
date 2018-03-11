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

