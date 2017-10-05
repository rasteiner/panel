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
          headline: 'Team',
          type: 'pages',
          parent: page.id
        }
      ]
    }
  ];

};
