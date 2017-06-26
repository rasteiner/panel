import UsersQuery from './Users.js';

export default function(username) {

  return UsersQuery().then(function(users) {

    let user = null;

    users.forEach(function(u) {
      if(u.username === username) {
        user = u;
      }
    }); 

    return user;

  });

}