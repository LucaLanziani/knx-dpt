const test = require('tape');
const DPTLib = require('../../../src');

var dpt = DPTLib.resolve('DPT6');

var tests = [
    [[0x00], 0],
    [[0x01], 1],
    [[0x0A], 10],
    [[0x64], 100],
    [[0x7F], 127],
    [[0xFF], -1],
    [[0xF6], -10],
    [[0x9C], -100],
    [[0x80], -128],
];

test('DPT6 conversion', function (t) {
    t.plan(tests.length * 2);
    for (var i = 0; i < tests.length; i++) {
        var buf = new Buffer(tests[i][0]);
        var obj = tests[i][1];

        // backward test (object to raw data)
        converted = dpt.formatAPDU(obj);
        t.deepEqual(converted, buf, `DPT6 formatAPDU ${JSON.stringify(obj)}`);

        // forward test (raw data to object)
        var converted = dpt.fromBuffer(buf);
        t.equal(converted, obj, `DPT6 fromBuffer ${JSON.stringify(buf)}`);
    }
    t.end();
});