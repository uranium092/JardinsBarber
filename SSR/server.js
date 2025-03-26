const express = require('express');
const app = express();
const path = require('path');
const parse = require('body-parser');
const cookie = require('cookie-parser');
const http = require('http');
const socket = require('socket.io');

app.use(express.static(path.join(__dirname, 'static')));

app.use(parse.json());
app.use(parse.urlencoded());
app.use(cookie());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');

app.use('/', require('./Routers/StaticResources'));

app.use('/usuario', require('./Routers/User'));

app.use('/admin', require('./Routers/Admin'));

app.use('/barbero', require('./Routers/Barbero'));

app.get('/registrarCookie/:key/:rol', (req, res) => {
  res.cookie('id', req.params.key, { maxAge: 3600000 });
  res.cookie('rol', req.params.rol, { maxAge: 3600000 });
  res.send('ok');
});

app.get('/borrarCookies', (req, res) => {
  res.cookie('id', 0, { maxAge: -1 });
  res.cookie('rol', null, { maxAge: -1 });
  res.redirect('/index');
});

app.use((req, res) => {
  res.status(404).render('404');
});

const port = 16000;

const server = http.createServer(app).listen(port, () => {
  console.log('Server Running on http://localhost:16000');
});

const io = socket(server);
io.on('connection', (client) => {
  client.on('agendar', (id, end) => {
    client.broadcast.emit('refresh', id);
    end();
  });
});
