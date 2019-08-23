import express from 'express';
import morgan from 'morgan';
import debug from 'debug';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import '@babel/polyfill';
import { config } from 'dotenv';
import api from './routes/index';
import Response from './utils/Response';

config();

const app = express();
const port = process.env.PORT || 5000;
const debugged = debug('server');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/', api);

app.use((err, req, res, next) => {
  // We log the error internaly
  debugged('err > ', err);
  //  Remove error's `stack` property. We don't want users to see this at the production env
  const error = process.env.NODE_ENV === 'development' ? err : {};

  Response.error(res, err.status || 500, error);
  next();
});

app.all('*', (req, res) => {
  Response.error(res, 404, 'route is invalid');
});

mongoose.Promise = global.Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

app.listen(port, () => debugged(`Server running on port ${port} 🔥`));

export default app;
