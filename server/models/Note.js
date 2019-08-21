import { Schema, model } from 'mongoose';

const NoteSchema = Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// eslint-disable-next-line func-names
const autoPopulateAuthor = function (next) {
  this.populate({
    path: 'user',
    select: '_id email',
  });
  next();
};

NoteSchema.pre('find', autoPopulateAuthor);
NoteSchema.pre('findOne', autoPopulateAuthor);

const Note = model('Note', NoteSchema);

export default Note;
