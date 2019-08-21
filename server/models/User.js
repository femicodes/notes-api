/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'cannot be empty'],
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('User', UserSchema);

export default User;
