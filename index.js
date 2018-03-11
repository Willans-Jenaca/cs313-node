var cool = require('cool-ascii-faces');
const express = require('express');
const app = express();

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM node.test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

app.set('port', (process.env.PORT || 5000));

// operand map
const OP_FUNC = {
  add: add,
  sub: sub,
  mul: mul,
  div: div,
};

// op symbol map
const OP_SYMB = {
  add: '+',
  sub: '-',
  mul: 'x',
  div: '/',
};

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index')
// });

// And here's our home page
app.get('/', (req, res) => res.render('home'));

app.get('/cool', function(request, response) {
  response.send(cool());
});


// Our math page
app.get('/math', (req, res) => {
  let result = OP_FUNC[req.query.operator](+req.query.op1, +req.query.op2);
  console.log(result);
  res.render('result', {
    op1: +req.query.op1,
    op2: +req.query.op2,
    op: OP_SYMB[req.query.operator],
    result: result,
  });
});

// Our math service
app.get('/math_service/:op/:op1/:op2', (req, res) => {
  console.log(req.params);
  let result = OP_FUNC[req.params.op](+req.params.op1, +req.params.op2);
  console.log(result);
  res.json({
    op1: +req.params.op1,
    op2: +req.params.op2,
    op: OP_SYMB[req.params.op],
    result: result,
  });
});

function add(op1, op2) {
  return op1 + op2;
}

function sub(op1, op2) {
  return op1 - op2;
}

function mul(op1, op2) {
  return op1 * op2;
}

function div(op1, op2) {
  return op1 / op2;
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
