module.exports = function (page, data) {

  return [

    {
      width: '2/3',
      sections: [
        {
          type: 'fields',
          values: page.content,
          fields: [
            {
              name: 'intro',
              label: 'Intro',
              type: 'textarea'
            },
            {
              name: 'text',
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
          headline: 'Latest Projects',
          type: 'pages',
          parent: 'projects',
          pagination: {
            limit: 3,
            details: true,
            align: 'center'
          }
        }
      ]
    },

  ];

};
