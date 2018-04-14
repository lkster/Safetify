module.exports = {
    equals: function ( value1, value2, value3, options ) {
        return value1.find(e => e[value2] == value3) ? options.fn(this) : "";
      }
}