module.exports = function () {

  return [
    {
      width: '1/2',
      sections: [
        {
          headline: 'Projects',
          type: 'pages',
          parent: 'projects'
        }
      ]
    },
    {
      width: '1/2',
      sections: [
        {
          headline: 'Blog',
          type: 'pages',
          parent: 'blog'
        }
      ]
    },
    {
      width: '1/2',
      sections: [
        {
          headline: 'Team',
          type: 'pages',
          parent: 'about'
        }
      ]
    },
    {
      width: '1/2',
      sections: [
        {
          headline: 'Misc',
          type: 'pages',
          parent: '/',
          filter: [
            {
              field: 'group',
              operator: '==',
              value: 'misc'
            }
          ]
        }
      ]
    },
  ];

};
