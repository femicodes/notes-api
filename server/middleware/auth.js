/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../models/User';
import Response from '../utils/Response';

config();

class Auth {
  static async authenticate(req, res, next) {
    try {
      const token = req.header('Authorization').replace('Bearer', '').trim();
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findOne({ _id: decoded._id });
      if (!user) {
        return Response.error(res, 400, 'User doesn\'t exist!');
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (error) {
      return Response.error(res, 400, 'Please authenticate!');
    }
  }
}

export default Auth;
