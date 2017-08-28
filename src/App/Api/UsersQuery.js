import Query from './Query.js';

export default (params) => {

  const query = `
    query($page: Int, $limit: Int, $role: String) {
      users(page: $page, limit: $limit, role: $role) {
        pagination {
          page,
          limit
          total
        }
        items {
          email,
          firstName,
          role,
          image {
            url
          }
        }
      }
    }
  `;

  return Query(query, {page: params.pagination.page, limit: params.pagination.limit, role: params.role}).then(function (response) {
    return {
      users:      response.users.items,
      pagination: response.users.pagination
    }
  });

};
