import express from 'express'
import {authenticate} from '../middlewares/authenticate.middleware'
import { create, getAll, getById, remove, update } from '../controllers/category.controller';

const router = express.Router();

// /category

// category post route
router.post('/',authenticate(),create);

// get all categories
router.get('/',getAll)

// get by id 
router.get('/:id',getById)

// update category
router.put('/:id',update)

// delete
router.delete('/:id',remove)

export default router;