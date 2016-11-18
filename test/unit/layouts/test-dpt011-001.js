const test = require('tape');
const DPTLib = require('../../../src');

var dpt = DPTLib.resolve('DPT11.001');

var tests = [
    [[25, 12, 95], new Date('25 Dec 1995')],
    [[25, 12, 15], new Date('25 Dec 2015')]
];

test('DPT11.001', function (t) {
    t.plan(tests.length * 4);
    for (var i = 0; i < tests.length; i++) {
        let buf = new Buffer(tests[i][0]);
        let val = tests[i][1];

        // backward test (value to raw data)
        let converted = dpt.formatAPDU(val);
        t.deepEqual(converted, buf, `DPT11.001 formatAPDU ${JSON.stringify(val)}`);

        // forward test (raw data to value)
        converted = dpt.fromBuffer(buf);
        t.equal(converted.getDate(), val.getDate(), `DPT11.001 fromBuffer ${JSON.stringify(buf)}`);
        t.equal(converted.getMonth(), val.getMonth(), `DPT11.001 fromBuffer ${JSON.stringify(buf)}`);
        t.equal(converted.getFullYear(), val.getFullYear(), `DPT11.001 fromBuffer ${JSON.stringify(buf)}`);
    }
    t.end()
})