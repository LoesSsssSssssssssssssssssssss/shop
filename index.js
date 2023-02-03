const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const port = 3000;
const booksRouter = require('./routes/mainrouter.js')
let user = require('./data/User/user.json')
let product = require('./data/Product/product.json')
let reviews = require('./data/Reviews/reviews.json')

const session = require('express-session')

const auth = require('./routes/auth.js');
const refreshToken = require("./routes/refreshToken.js");

app.use(session({
  name : 'session',
  secret : 'shlagbaum',
  resave : true,
  saveUninitialized: false,
  cookie : {
          maxAge:(1000 * 60 * 100)
  },
  refreshToken : '',
  role: 'user',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.use("/api", auth);
app.use("/api/refreshToken", refreshToken);

app.use((err, req, res, next) => {
	logger.error(err.stack);
	res.status(500).send("Вы сломали сервер!");
});

app.use((err, req, res, next) => {
	if (error instanceof ForbiddenError) {
		return res.status(403).send({
			status: "forbidden",
			message: error.message,
		});
	}
});

app.use('/book', booksRouter)

app.get('/user', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(user, null, '\t'))
})

app.post ('/reg', (req, res) => {
  res.status(200).type('text/plain')
  res.send('reg')
})

app.put('/update', (req, res) => {
  res.status(200).type('text/plain')
  res.send('reg')
})

app.delete('/user/:id', (req, res) => {
  res.status(200).type('text/plain')
  res.send('reg')
})

app.get('/product', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(product, null, '\t'))
})

app.get('/product/:id', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(product[0], null, '\t'))
})

app.post('/product', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(product.push(123), null, '\t'))
})

app.delete('/product', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(product, null, '\t'))
})

app.put('/product', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(product, null, '\t'))
})

app.get('/reviews', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(reviews, null, '\t'))
})

app.delete('/reviews/:id', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(reviews, null, '\t'))
})

app.put('/reviews/:id', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(reviews, null, '\t'))
})

app.post('/reviews', (req, res) => {
  res.status(200).type('text/plain')
  res.send(JSON.stringify(reviews, null, '\t'))
})

server.listen(port, () => console.log('started'))

module.exports = app