import Query from './Query.js';

export default (page) => {

  const query = `
    mutation($page: PageInput) {
      createPage(page: $page) {
        id,
        slug,
        url,
        title,
        template
      }
    }
  `;

  return Query(query, { page: page });

};
