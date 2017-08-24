export default (blueprint, page) => {
  return require('@/Blueprints/' + blueprint + '.js')(page);
};
