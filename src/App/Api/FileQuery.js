import Query from './Query.js';

export default (path) => {

  const query = `
    query($id: String) {
      file(id: $id) {
        url,
        filename,
        niceSize,
        page {
          id,
          title,
          parents {
            id,
            title
          }
        }
      }
    }
  `;

  return Query(query, { id: path }).then((response) => {

    let file = response.file;

    file.link       = '/files/' + file.page.id + '/' + file.filename;
    file.breadcrumb = file.page.parents.map((page) => ({
      link: '/pages/' + page.id,
      label: page.title
    }));

    file.breadcrumb.push({
      link: '/pages/' + file.page.id,
      label: file.page.title
    });

    return file;
  });

};
