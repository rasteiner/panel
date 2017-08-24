module.exports = function (page) {

  return [
    {
      width: '1/1',
      sections: [
        {
          headline: 'Published',
          type: 'pages',
          parent: page.id,
          layout: 'cards'
        }
      ]
    }
  ];

};
