import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, removeUserById } from './../controller';

const router = Router();

router.route('/api/user/:userId').get(getUserById);
router.route('/api/users').get(getAllUsers);
// router.post('/api/user', validator.body(userQuerySchema), createUser);
router.post('/api/user', createUser);
// router.put('/api/user/:userId', validator.body(userQuerySchema), updateUser);
router.put('/api/user/:userId', updateUser);
router.delete('/api/user/:userId', removeUserById);

export {router} ;