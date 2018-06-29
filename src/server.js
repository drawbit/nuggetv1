import Express from 'express';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import redis from "redis";
import session from 'express-session';
import bodyParser from 'body-parser';
import httpProxy from 'http-proxy';
import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';
import { signinRoute, registerRoute, handle_database, logout, fetchStatus, addStatus } from './serverMiddleware/authApiHandler.js';
import { reactRoutehandler, apiRoutesHandler } from './serverMiddleware/reactRoutesHandler.js';
import { getalltests, getCreatetest, postCreatetest, getATest } from './serverMiddleware/assesmentApiHandler.js';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
// const client  = redis.createClient();
// const redisStore =  require('connect-redis')(session);

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'logo.jpg')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use(session({
  secret: 'nugget123secretsession1',
  name: 'tmstmp',
  //create new redis store.
  // store: new redisStore({
  //   host:  __DEVELOPMENT__ ? '127.0.0.1' : 'prod-redis-fresh.buu8uw.0001.use2.cache.amazonaws.com',
  //   port: 6379,
  //   client: client
  // }),
  resave: false
}));

//Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work
app.use(bodyParser.json());


app.post('/api/signin', signinRoute);

app.post("/api/register",registerRoute);

app.get('/api/logout', logout);

app.get("/fetchStatus", fetchStatus);

app.post("/addStatus", addStatus);

app.get('/api/getalltests', getalltests);

//save new Test
app.post('/api/createtest/new', postCreatetest);

//Get new Test
app.get('/api/gettest/:testid', getATest);

// Proxy to API server
app.use('/api', apiRoutesHandler);

//This handles all the routes that is not matched above , basically page routes . 
app.use(reactRoutehandler);

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('%s is running, on %s port', config.app.title, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
