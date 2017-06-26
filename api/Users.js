export default function(params) {

  const options = params || {};

  return fetch('/mock/data/users.json').then(function (response) {
    return response.json()
  }).then(function(users) {

    if(options.role) {
      users = users.filter(function(user) {
        return user.role.toLowerCase() === options.role.toLowerCase() ? true : false;
      });
    }

    return users;

  });

}
