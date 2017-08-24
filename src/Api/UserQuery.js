import Query from './Query.js';

export default (email) => {

  const query = `
    query($email: String) {
      user(email: $email) {
        email,
        firstName,
        lastName,
        role,
        image {
          url
        }
      }
    }
  `;

  return Query(query, {email: email}).then(function(response) {
    return response.user;
  });

};
