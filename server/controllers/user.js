/* eslint-disable no-underscore-dangle */
import User from '../models/User';
import Response from '../utils/Response';
import { validateSignup, validateLogin } from '../validations/auth';

class UserController {
  static async signup(req, res) {
    try {
      const { error } = validateSignup(req.body);
      if (error) return Response.error(res, 400, error.details[0].message);

      const {
        name, email, password,
      } = req.body;

      const newUser = new User({
        name, email, password,
      });

      const checkUser = await User.findOne({ email });
      if (checkUser) return Response.error(res, 403, 'Email already in use.');

      const user = await newUser.save();
      const token = await newUser.generateToken();
      const data = {
        token,
        name: user.name,
        email: user.email,
      };
      return Response.success(res, 201, data, 'Account created!');
    } catch (error) {
      return Response.error(res, 400, 'An error occured.');
    }
  }

  static async login(req, res) {
    try {
      const { error } = validateLogin(req.body);
      if (error) return Response.error(res, 400, error.details[0].message);

      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (!user) return Response.error(res, 404, 'User not found.');

      const checkPassword = await user.comparePassword(password);
      if (!checkPassword) {
        return Response.error(res, 403, 'Wrong password');
      }

      const token = user.generateToken();
      const data = {
        token,
        user_id: user._id,
        name: user.name,
        email: user.email,
      };
      return Response.success(res, 200, data, 'Login successful!');
    } catch (error) {
      return Response.error(res, 400, 'An error occured.');
    }
  }
}

export default UserController;
