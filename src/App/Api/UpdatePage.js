import Query from './Query.js';

export default (page) => {

  const query = `
    mutation($page: PageInput) {
      updatePage(page: $page) {
        id
      }
    }
  `;

  return Query(query, { page: page });

};
