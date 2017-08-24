module.exports = function (page, data) {

  return [
    {
      width: '1/3',
      sections: [
        {
          headline: 'Cover',
          layout: 'cards',
          type: 'files',
          parent: page.id,
          pagination: {
            hide: true,
            page: 1,
            limit: 1
          }
        },
        {
          headline: 'Gallery',
          type: 'files',
          parent: page.id
        }
      ]
    },

    // middle column
    {
      width: '2/3',
      sections: [
        {
          type: 'fields',
          values: page.fields,
          fields: [
            {
              name: 'year',
              label: 'Year',
              type: 'text',
              width: '1/2'
            },
            {
              name: 'client',
              label: 'Client',
              type: 'text',
              width: '1/2'
            },
            {
              name: 'category',
              label: 'Category',
              type: 'tags'
            },
            {
              name: 'intro',
              label: 'Introduction',
              type: 'textarea'
            },
            {
              name: 'text',
              id: 'text',
              label: 'Text',
              type: 'textarea'
            },
          ]
        },
      ]
    },

  ];

};
