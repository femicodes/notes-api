import { Router } from 'express';
import NotesController from '../controllers/notes';
import Auth from '../middleware/auth';

const noteRoute = Router();

noteRoute.post('/add', Auth.authenticate, NotesController.createNote);
noteRoute.get('/viewAll', Auth.authenticate, NotesController.viewAllNotes);
noteRoute.patch('/update/:id', Auth.authenticate, NotesController.updateNote);

export default noteRoute;
