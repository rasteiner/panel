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
        fields {
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

  return Query(query, {id: path}).then(function (response) {

    let page = response.page;
    let data = {};

    page.fields.forEach(function (item) {
      data[item.key] = item.value;
    });

    page.fields     = data;
    page.link       = '/pages/' + page.id;
    page.breadcrumb = page.parents.map(function (page) {
      return {
        link: '/pages/' + page.id,
        label: page.title
      };
    });

    return page;

  }.bind(this));

};
