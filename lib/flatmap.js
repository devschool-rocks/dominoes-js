module.exports = function(array, fn) {
  return array.concat.apply([], array.map(fn));
};
