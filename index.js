var cool = require('cool-ascii-faces');
const express = require('express');
const app = express();

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    // client.query('SELECT * FROM node.test_table', function(err, result) {
      client.query('SELECT * FROM node.person', function(err, result) {
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
  stamped: stamped,
  metered: metered,
  envelope: envelope,
  retail: retail,
};

// op symbol map
const OP_SYMB = {
  stamped: 'Stamped Letters',
  metered: 'Metered Letters',
  envelope: 'Large Envelopes (Flats)',
  retail: 'First-Class Package Service - Retail',
};

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// GET for index page - replaced by home for this assignment
// app.get('/', function(request, response) {
//   response.render('pages/index')
// });

// And here's our home page
app.get('/', (req, res) => res.render('home'));

// validation with cool ancii faces
app.get('/cool', function(request, response) {
  response.send(cool());
});


// Calculation result page
app.get('/math', (req, res) => {
  let result = OP_FUNC[req.query.operator](+req.query.op1);
  result = result.toFixed(2);
  console.log(result);
  res.render('result', {
    op1: +req.query.op1,
    op: OP_SYMB[req.query.operator],
    result: result,
  });
});

// Calculation service
app.get('/math_service/:op/:op1', (req, res) => {
  console.log(req.params);
  let result = OP_FUNC[req.params.op](+req.params.op1);
  result = result.toFixed(2);
  console.log(result);
  res.json({
    op1: +req.params.op1,
    op: OP_SYMB[req.params.op],
    result: result,
  });
});

var classChanged = "";

function stamped(op1) {
  if (op1 <= 1) {
    op1 = 0.50;
  } else if (op1 <= 2) {
    op1 = 0.71;
  } else if (op1 <= 3) {
    op1 = 0.92;
  } else if (op1 <= 3.5) {
    op1 = 1.13;
  } else if (op1 > 3.5) {
    op1 = envelope(op1);
    classChanged = "Price shown for Large Envelope";
  }
  return op1;
}

function metered(op1) {
  if (op1 <= 1) {
    op1 = 0.47;
  } else if (op1 <= 2) {
    op1 = 0.68;
  } else if (op1 <= 3) {
    op1 = 0.89;
  } else if (op1 <= 3.5) {
    op1 = 1.10;
  } else if (op1 > 3.5) {
    op1 = envelope(op1);
    classChanged = "Price shown for Large Envelope";
  }
  return op1;
}

function envelope(op1) {
  if (op1 <= 1) {
    op1 = 1.00;
  } else if (op1 <= 2) {
    op1 = 1.21;
  } else if (op1 <= 3) {
    op1 = 1.42;
  } else if (op1 <= 4) {
    op1 = 1.63;
  } else if (op1 <= 5) {
    op1 = 1.84;
  } else if (op1 <= 6) {
    op1 = 2.05;
  } else if (op1 <= 7) {
    op1 = 2.26;
  } else if (op1 <= 8) {
    op1 = 2.47;
  } else if (op1 <= 9) {
    op1 = 2.68;
  } else if (op1 <= 10) {
    op1 = 2.89;
  } else if (op1 <= 11) {
    op1 = 3.10;
  } else if (op1 <= 12) {
    op1 = 3.31;
  } else if (op1 <= 13) {
    op1 = 3.52;
  } 
  return op1;
}

function retail(op1) {
  if (op1 <= 4) {
    op1 = 3.50;
  } else if (op1 <= 8) {
    op1 = 3.75;
  } else if (op1 <= 9) {
    op1 = 4.10;
  } else if (op1 <= 10) {
    op1 = 4.45;
  } else if (op1 <= 11) {
    op1 = 4.80;
  } else if (op1 <= 12) {
    op1 = 5.15;
  } else if (op1 <= 13) {
    op1 = 5.50;
  } 
  return op1;
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
