/* eslint-disable no-underscore-dangle */
import Note from '../models/Note';
import Response from '../utils/Response';
import validateNote from '../validations/notes';

class NotesController {
  static async createNote(req, res) {
    try {
      const { error } = validateNote(req.body);
      if (error) return Response.error(res, 400, error.details[0].message);

      const { title, body } = req.body;
      const user = req.user._id;

      const note = new Note({
        title, body, user,
      });

      const checkNote = await Note.findOne({ title });
      if (checkNote) return Response.error(res, 400, 'Note already exists!');

      await note.save();

      const data = {
        id: note._id,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt,
      };

      return Response.success(res, 201, data, 'Note created!');
    } catch (error) {
      return Response.error(res, 400, 'An error occured.');
    }
  }

  static async viewAllNotes(req, res) {
    try {
      const user = req.user._id;
      const note = await Note
        .find({ user })
        .sort({ createdAt: -1 })
        .exec();

      const notes = note.map((item) => ({
        id: item._id,
        title: item.title,
        body: item.body,
        createdAt: item.createdAt,
      }));

      const data = {
        count: notes.length,
        data: notes,
      };

      return Response.success(res, 200, data);
    } catch (error) {
      return Response.error(res, 400, 'An error occured.');
    }
  }

  static async updateNote(req, res) {
    try {
      const { error } = validateNote(req.body);
      if (error) return Response.error(res, 400, error.details[0].message);

      const noteUpdate = await Note.findOneAndUpdate({ user: req.user._id, _id: req.params.id },
        { $set: req.body },
        { new: true });
      if (!noteUpdate) return Response.error(res, 404, 'User with given username not found!');

      const data = {
        id: noteUpdate._id,
        title: noteUpdate.title,
        body: noteUpdate.body,
        createdAt: noteUpdate.createdAt,
      };

      return Response.success(res, 201, data, 'Profile updated!');
    } catch (error) {
      return Response.error(res, 400, 'An error occured.');
    }
  }
}

export default NotesController;
