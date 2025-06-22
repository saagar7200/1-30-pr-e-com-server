import express from 'express'
import { login, register } from '../controllers/auth.controller'

const router = express.Router()

// product
// crud

// register user
router.post('/register',register)
router.post('/login',login)



export default router

