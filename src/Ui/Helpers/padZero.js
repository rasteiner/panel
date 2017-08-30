String.prototype.padZero = function (length) {
  let string = '';

  length = (length || 2) - this.length;

  while(string.length < length) {
    string += '0';
  }

  return string + this;
};

Number.prototype.padZero = function (length) {
  return String(this).padZero(length);
};
