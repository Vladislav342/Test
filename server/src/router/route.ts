import { Router } from 'express';
const router = Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.registration
);

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userController.login
);

router.get('/hello', userController.getUsers);

router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);

module.exports = router;