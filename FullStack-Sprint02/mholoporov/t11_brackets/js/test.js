const assert = chai.assert;

describe('checkBrackets', function() {
    // Successful test cases
    it('should return -1 when given an empty string', function() {
        assert.strictEqual(checkBrackets(''), -1);
    });

    it('should return -1 when given a string without brackets', function() {
        assert.strictEqual(checkBrackets('hello'), -1);
    });

    it('should return 0 when given a string with balanced brackets', function() {
        assert.strictEqual(checkBrackets('(hello)'), 0);
    });

    it('should return 1 when given a string with one extra closing bracket', function() {
        assert.strictEqual(checkBrackets('(hello))'), 1);
    });

    it('should return 3 when given a string with two extra closing brackets', function() {
        assert.strictEqual(checkBrackets('(he(llo)))))'), 3);
    });

    it('should return 1 when given a string with one extra opening bracket', function() {
        assert.strictEqual(checkBrackets('((hello)'), 1);
    });

    it('should return 3 when given a string with two extra opening brackets', function() {
        assert.strictEqual(checkBrackets('(((he(llo)'), 3);
    });

    it('should return 0 when given a string with nested balanced brackets', function() {
        assert.strictEqual(checkBrackets('(he(llo) wor(ld))'), 0);
    });

    it('should return 1 when given a string with nested unbalanced brackets', function() {
        assert.strictEqual(checkBrackets('(he(llo wor(ld))'), 1);
    });

    it('should return 2 when given a string with only closing brackets', function() {
        assert.strictEqual(checkBrackets(')()())'), 2);
    });

    // Incorrect test cases
    it('should return -1 when given a non-string input', function() {
        assert.strictEqual(checkBrackets(123), -1);
    });

    it('should return -1 when given undefined', function() {
        assert.strictEqual(checkBrackets(undefined), -1);
    });

    it('should return -1 when given null', function() {
        assert.strictEqual(checkBrackets(null), -1);
    });

    it('should return -1 when given an array', function() {
        assert.strictEqual(checkBrackets(['hello']), -1);
    });

    it('should return -1 when given an object', function() {
        assert.strictEqual(checkBrackets({ text: 'hello' }), -1);
    });
});




