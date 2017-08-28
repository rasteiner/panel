export default (blueprint, page) => {
  return require('App/Blueprints/' + blueprint + '.js')(page);
};
