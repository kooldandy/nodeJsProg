import { Router } from 'express';
import {
  getUserById,
  removeUserById,
  getAllUsers,
  createUser,
  updateUser,
  getAutoSuggestUsers,
} from './../controllers/users';
import {
  userQuerySchema,
  autoSuggestQuerySchema,
} from './../schema/userSchema';
import Joi from 'express-joi-validation';
const validator = Joi.createValidator({});

const router = Router();

router.route('/api/user/:userId').get(getUserById).delete(removeUserById);
router.route('/api/users').get(getAllUsers);
router.post('/api/users', validator.body(userQuerySchema), createUser);
router.put('/api/user/:userId', validator.body(userQuerySchema), updateUser);
router.get(
  '/api/sortedUsers',
  validator.query(autoSuggestQuerySchema),
  getAutoSuggestUsers,
);

export {router} ;
