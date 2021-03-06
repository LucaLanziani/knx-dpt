const test = require('tape');
const DPTLib = require('../../../src');

var tests = [
    [[0x75, 0x01, 0x01, 0x0c, 0x1e, 0x00, 0x00, 0x00], new Date(2017, 0, 1, 12, 30, 0)],
    [[0x63, 0x05, 0x0a, 0x37, 0x3b, 0x05, 0x00, 0x00], new Date(1999, 4, 10, 23, 59, 5)],
    [[0x64, 0x0c, 0x1f, 0x00, 0x3b, 0x3b, 0x00, 0x00], new Date(2000, 11, 31, 0, 59, 59)],
];
var defaultTypes = ["DPT19", "DPT19.001"];

for (var type in defaultTypes) {
    var dptName = defaultTypes[type];
    test(dptName, function (t) {
        var dpt = DPTLib.resolve(dptName);
        t.plan(tests.length * 2);
        for (var i = 0; i < tests.length; i++) {
            var buf = new Buffer(tests[i][0]);
            var obj = tests[i][1];

            // backward test (object to raw data)
            var converted = dpt.formatAPDU(obj);
            t.deepEqual(converted, buf, `${dptName} formatAPDU ${JSON.stringify(obj)}`);

            // forward test (raw data to object)
            converted = dpt.fromBuffer(buf);
            t.equal(converted.toString(), obj.toString(), `${dptName} fromBuffer ${JSON.stringify(buf)}`);
        }
        t.end();
    });
}