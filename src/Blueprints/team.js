module.exports = function (page, data) {

  return [

    {
      width: '2/3',
      sections: [
        {
          type: 'fields',
          values: page.fields,
          fields: [
            {
              name: 'position',
              label: 'Position',
              type: 'text'
            },
            {
              name: 'phone',
              label: 'Phone',
              type: 'tel',
              width: '1/2'
            },
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              width: '1/2'
            },
            {
              name: 'about',
              label: 'About',
              type: 'textarea'
            },
          ]
        }
      ]
    },

    {
      width: '1/3',
      sections: [
        {
          headline: 'Image',
          type: 'files',
          layout: 'cards',
          parent: page.id
        }
      ]
    },

  ];

};
