
import express from 'express'
import { create, getAll, getById, remove, update } from '../controllers/product.controller';
import { authenticate } from '../middlewares/authenticate.middleware';
import { onlyAdmin } from '../types/global.types';

const router = express.Router()


router.get('/',getAll);

router.get('/:id',getById)

router.post('/',authenticate(onlyAdmin),create);

router.put('/:id',authenticate(onlyAdmin),update)

router.delete('/:id',authenticate(onlyAdmin),remove)






export default router;