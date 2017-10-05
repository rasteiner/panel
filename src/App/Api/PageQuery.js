import Query from './Query.js';

export default (path) => {

  const query = `
    query($id: String) {
      page(id: $id) {
        id,
        slug,
        url,
        title,
        template,
        parent {
          id,
          slug,
          title
        }
        content {
          key,
          value
        },
        parents {
          id,
          title
        }
      }
    }
  `;

  return Query(query, { id: path }).then((response) => {

    let page = response.page;
    let data = {};

    page.content.forEach((item) => {
      data[item.key] = item.value;
    });

    page.content    = data;
    page.link       = '/pages/' + page.id;
    page.breadcrumb = page.parents.map((page) => ({
      link: '/pages/' + page.id,
      label: page.title
    }));

    return page;

  });

};
