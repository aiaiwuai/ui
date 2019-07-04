function jsonify (x) {
  return JSON.parse(JSON.stringify(x));
}

module.exports = function (chai, utils) {
  chai.Assertion.addChainableMethod('jsonEqual',
    function (x) {
      var expected = jsonify(x),
          actual = jsonify(this._obj);

      this.assert(
        utils.eql(actual, expected),
        'expected #{act} to have the same json representation as #{exp}',
        'expected #{act} to have a different json representation than #{exp}',
        expected,
        actual
      );
    }, function () {
      utils.flag(this, 'jsonEqual', true);
    }
  );

  function transformBeforeAssert (_super) {
    return function (expected) {
      var jsonEqualEnabled = utils.flag(this, 'jsonEqual');

      if (jsonEqualEnabled) {
        expected = jsonify(expected);
        utils.flag(this, 'object', jsonify(this._obj));
      }
      _super.call(this, expected);
    };
  }

  function passThrough (_super) {
    return _super;
  }

  chai.Assertion.overwriteChainableMethod('contain', transformBeforeAssert, passThrough);
  chai.Assertion.overwriteMethod('members', transformBeforeAssert);
};
