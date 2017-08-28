module.exports = function (page) {

  return [
    {
      width: '1/2',
      sections: [
        {
          headline: 'Drafts',
          type: 'pages',
          parent: page.id,
          filter: [
            {
              field: 'draft',
              operator: '==',
              value: '1'
            }
          ]
        }
      ]
    },
    {
      width: '1/2',
      sections: [
        {
          headline: 'Published articles',
          type: 'pages',
          parent: page.id,
          filter: [
            {
              field: 'draft',
              operator: '!=',
              value: '1'
            }
          ]
        }
      ]
    }
  ];

};
