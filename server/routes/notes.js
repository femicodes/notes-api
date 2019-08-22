import { Router } from 'express';
import NotesController from '../controllers/notes';
import Auth from '../middleware/auth';

const noteRoute = Router();

noteRoute.post('/add', Auth.authenticate, NotesController.createNote);
noteRoute.get('/viewAll', Auth.authenticate, NotesController.getAllNotes);
noteRoute.get('/view/:id', Auth.authenticate, NotesController.getNote);
noteRoute.patch('/update/:id', Auth.authenticate, NotesController.updateNote);
noteRoute.delete('/delete/:id', Auth.authenticate, NotesController.deleteNote);

export default noteRoute;
