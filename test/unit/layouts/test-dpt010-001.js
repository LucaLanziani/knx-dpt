const test = require('tape');
const DPTLib = require('../../../src');

var dpt = DPTLib.resolve('DPT10.001');

var tests = [
    [[12, 23, 34], '12:23:34'],
    [[15, 45, 56], '15:45:56']
];

test('DPT10.001', function (t) {
    t.plan(tests.length * 2);
    for (var i = 0; i < tests.length; i++) {
        let buf = new Buffer(tests[i][0]);
        let val = tests[i][1];

        // backward test (value to raw data)
        let converted = dpt.formatAPDU(val);
        t.deepEqual(converted, buf, `DPT10.001 formatAPDU ${JSON.stringify(val)}`);

        // forward test (raw data to value)
        converted = dpt.fromBuffer(buf);
        t.equal(converted, val, `DPT10.001 fromBuffer ${JSON.stringify(buf)}`);
    }
    t.end()
});