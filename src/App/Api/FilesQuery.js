import Query from './Query.js';

export default (params) => {

  const query = `
    query($query: FilesQueryInput) {
      files(query: $query) {
        pagination {
          total
        }
        items {
          filename,
          url,
          niceSize
        }
      }
    }
  `;

  return Query(query, {query: params}).then(function (response) {
    return {
      files:      response.files.items,
      pagination: response.files.pagination
    };
  });

};
