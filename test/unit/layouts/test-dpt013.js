const test = require('tape');
const DPTLib = require('../../../src');

var dpt = DPTLib.resolve('DPT13');

var tests = [
    [[0x00, 0x00, 0x00, 0x00], 0],
    [[0x00, 0x00, 0x00, 0x01], 1],
    [[0x00, 0x00, 0x00, 0x0A], 10],
    [[0x00, 0x00, 0x00, 0x64], 100],
    [[0x00, 0x00, 0x00, 0x7F], 127],
    [[0x00, 0x00, 0x00, 0x80], 128],
    [[0x00, 0x00, 0x01, 0x00], 256],
    [[0x00, 0x00, 0x7F, 0xFF], 32767],
    [[0x7F, 0xFF, 0xFF, 0xFF], 2147483647],
    [[0xFF, 0xFF, 0xFF, 0xFF], -1],
    [[0xFF, 0xFF, 0xFF, 0xF6], -10],
    [[0xFF, 0xFF, 0xFF, 0x9C], -100],
    [[0xFF, 0xFF, 0xFF, 0x80], -128],
    [[0xFF, 0xFF, 0xFF, 0x00], -256],
    [[0xFF, 0xFF, 0x80, 0x00], -32768],
    [[0x80, 0x00, 0x00, 0x00], -2147483648],
];

test('DPT13 conversion', function (t) {
    t.plan(tests.length * 2);
    for (var i = 0; i < tests.length; i++) {
        var buf = new Buffer(tests[i][0]);
        var obj = tests[i][1];

        // backward test (object to raw data)
        converted = dpt.formatAPDU(obj);
        t.deepEqual(converted, buf, `DPT13 formatAPDU ${JSON.stringify(obj)}`);

        // forward test (raw data to object)
        var converted = dpt.fromBuffer(buf);
        t.equal(converted, obj, `DPT13 fromBuffer ${JSON.stringify(buf)}`);
    }
    t.end();
});