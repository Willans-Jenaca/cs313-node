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


// $(document).ready(() => {
//   $('#tweetAjax').click(getTweetData);
// });

//  async function getTweetData() {
  
//   let data = await fetch(`/home/:timeline`, {
//     method: 'GET',
//   });
//   let result = await data.json();
//   $('#tweetResult').text(
//     `The timeline is: ${result.timeline.length 
//     }.`,
//   );
// }


// $(document).ready(() => {
//   $('#tweetAjax').click(getTweetData);
// });

//  async function getTweetData() {
  
//   let data = await fetch(`/home/:timeline`, {
//     method: 'GET',
//   });
//   let result = await data.json();


//   var tweetData = [];
//   // loop through followers
//     result.timeline.forEach(function(text) {
//         tweetData.push(text);
//     });

//   $('#tweetResult').text(

//     `The timeline is: ${tweetData[0].text 
//     }.`,
//   );
// }

$(document).ready(() => {
  $('#tweetAjax').click(getTweetData);
});

 async function getTweetData() {
  
  let data = await fetch(`/home/:timeline`, {
    method: 'GET',
  });
  let result = await data.json();


  var tweetData = [];
  // loop through followers
    result.timeline.forEach(function(text) {
        tweetData.push(text);
    });

  $('#tweetResult').text(

    `${tweetData[0].text 
    }`,
  );
}


// function getTweets(timeline)
//   {        
//         // var parseTweet = JSON.parse(this);
//         var parseTweet = JSON.parse(timeline);
//        //var parseTweet = timeline;
//         console.log(parseTweet);
//         //var table = document.getElementById("tweetTable");
//         var table = document.getElementById("tweetTable");
//         var j = 1;

//         for (var i = 0; i < parseTweet.tweets.length; i++)
//         {
//             var row = table.insertRow(j);
//             var cell1 = row.insertCell(0);
//             var cell2 = row.insertCell(1);
//             cell1.innerHTML = parseTweet.tweets[i].screen_name;
//             cell2.innerHTML = parseTweet.tweets[i].text;
           
//             j++;
//         }
//   }

