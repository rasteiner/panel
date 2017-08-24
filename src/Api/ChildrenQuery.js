import Query from './Query.js';

export default (params) => {

  const query = `
    query($query: PagesQueryInput) {
      children(query: $query) {
        pagination {
          page,
          total,
          limit
        }
        items {
          url,
          id,
          title,
          image {
            url
          }
        }
      }
    }
  `;

  return Query(query, {query: params}).then(function (response) {

    let pages = response.children.items.map((page) => {

      page.link = '/pages/' + page.id;

      if (!page.image) {
        page.image = {
          url: '/'
        }
      }

      return page;

    });

    return {
      pages,
      pagination: response.children.pagination
    }

  });

};
