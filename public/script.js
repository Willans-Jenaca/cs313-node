$(document).ready(() => {
  $('#btnAjax').click(calc);
});

async function calc() {
  let op1 = $('#op1').val();
  let op2 = $('#op2').val();
  let op = $('#operator').val();

  let data = await fetch(`/math_service/${op}/${op1}/${op2}`, {
    method: 'GET',
  });
  let result = await data.json();
  $('#spnResult').text(
    `The result of ${result.op1} ${result.op} ${result.op2} is ${
      result.result
    }.`,
  );
}
