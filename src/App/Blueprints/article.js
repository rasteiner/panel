module.exports = function (page) {

  return [
    {
      width: '2/3',
      sections: [
        {
          type: 'fields',
          values: page.content,
          fields: [
            {
              name: 'text',
              id: 'text',
              label: 'Text',
              type: 'textarea'
            }
          ]
        }
      ]
    },

    {
      width: '1/3',
      sections: [
        {
          type: 'fields',
          values: page.content,
          fields: [
            {
              name: 'date',
              label: 'Date',
              type: 'date'
            },
            {
              name: 'author',
              label: 'Author',
              type: 'text',
              icon: 'user'
            },
            {
              name: 'tags',
              label: 'Tags',
              type: 'tags'
            }
          ]
        },
        {
          headline: 'Images',
          type: 'files',
          parent: page.id
        }
      ]
    },

  ];

};
