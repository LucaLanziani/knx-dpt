const test = require('tape');
const DPTLib = require('../../../src');

var dpt2 = DPTLib.resolve('DPT2');

var tests = [
    [[0x00], {data: 0, priority: 0}],
    [[0x01], {data: 1, priority: 0}],
    [[0x02], {data: 0, priority: 1}],
    [[0x03], {data: 1, priority: 1}]
];

test('DPT2 conversion', function (t) {
    t.plan(tests.length * 2);
    for (var i = 0; i < tests.length; i++) {
        var buf = new Buffer(tests[i][0]);
        var obj = tests[i][1];

        // backward test (object to raw data)
        converted = dpt2.formatAPDU(obj);
        t.deepEqual(converted, buf, `DPT2 formatAPDU ${JSON.stringify(obj)}`);

        // forward test (raw data to object)
        var converted = dpt2.fromBuffer(buf);
        t.deepEqual(converted, obj, `DPT2 fromBuffer ${JSON.stringify(buf)}`);
    }
    t.end();
});