const test = require('tape');
const DPTLib = require('../../../src');

var tests = [
    [[0x19, 0x86, 0x15, 0x20], {encryption: 0, readDirection: 1, permission: 0, error: 0, digit1:5 , digit2:1 , digit3:6 , digit4:8 , digit5:9 ,digit6: 1}],
    [[0x25, 0x73, 0x05, 0x50], {encryption: 1, readDirection: 0, permission: 1, error: 0, digit1:5 , digit2:0 , digit3:3 , digit4:7 , digit5:5 ,digit6: 2}],
    [[0x34, 0x22, 0x75, 0xB0], {encryption: 1, readDirection: 1, permission: 0, error: 1, digit1:5 , digit2:7 , digit3:2 , digit4:2 , digit5:4 ,digit6: 3}],
    [[0x47, 0x61, 0x55, 0xC0], {encryption: 0, readDirection: 0, permission: 1, error: 1, digit1:5 , digit2:5 , digit3:1 , digit4:6 , digit5:7 ,digit6: 4}]
];
var defaultTypes = ["DPT15", "DPT15.000"];

for (var type in defaultTypes) {
    var dptName = defaultTypes[type];
    test(dptName, function (t) {
        var dpt = DPTLib.resolve(dptName);
        t.plan(tests.length * 2);
        for (var i = 0; i < tests.length; i++) {
            var buf = new Buffer(tests[i][0]);
            var obj = tests[i][1];

            // backward test (object to raw data)
            converted = dpt.formatAPDU(obj);
            t.deepEqual(converted, buf, `${dptName} formatAPDU ${JSON.stringify(obj)}`);

            // forward test (raw data to object)
            var converted = dpt.fromBuffer(buf);
            t.deepEqual(converted, obj, `${dptName} fromBuffer ${JSON.stringify(buf)}`);
        }
        t.end();
    });
}