
import  express  from 'express';
import { clear, create, getall } from '../controllers/wishlist.controller';
import { authenticate } from '../middlewares/authenticate.middleware';
import { onlyUser } from '../types/global.types';

const router = express.Router()


router.post('/',authenticate(onlyUser),create)
router.get('/',authenticate(onlyUser),getall)
router.delete('/',authenticate(onlyUser),clear)


export default router