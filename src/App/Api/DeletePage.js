import Query from './Query.js';

export default (id) => {

  const query = `
    mutation($id: String) {
      deletePage(id: $id)
    }
  `;

  return Query(query, { id: id });

};
