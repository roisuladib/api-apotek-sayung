import getAll from './getAll.js'
import getId from './getId.js'
import register from './register.js'
import update from './update.js'
import login from './login.js'
import refreshToken from './refreshToken.js';
import logout from './logout.js';
import destroy from './destroy.js';

export const Users = {
   getAll,
   getId,
   register,
   update,
   login,
   refreshToken,
   logout,
   destroy
}