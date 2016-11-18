const test = require('tape');
const DPTLib = require('../../../src');

var dpt = DPTLib.resolve('DPT14');

var tests = [
    [[0b11000000, 0b11011001, 0b10011001, 0b10011010], -6.8]
];

var epsilon = 0.00001;

test('DPT14 conversion', function (t) {
    t.plan(tests.length * 2);
    for (var i = 0; i < tests.length; i++) {
        var buf = new Buffer(tests[i][0]);
        var obj = tests[i][1];

        // backward test (object to raw data)
        converted = dpt.formatAPDU(obj);
        t.deepEqual(converted, buf, `DPT14 formatAPDU ${JSON.stringify(obj)}`);

        // forward test (raw data to object)
        var converted = dpt.fromBuffer(buf);
        t.ok(Math.abs(converted - obj) < epsilon, `DPT14 fromBuffer ${JSON.stringify(buf)}`);
    }
    t.end();
});