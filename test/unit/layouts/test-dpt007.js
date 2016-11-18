const test = require('tape');
const DPTLib = require('../../../src');

var dpt = DPTLib.resolve('DPT7');

var tests = [
    // MSB LSB
    [[0x00, 0x00], 0],
    [[0x00, 0x01], 1],
    [[0x00, 0x02], 2],
    [[0x00, 0xFF], 255],
    [[0x01, 0x00], 256],
    [[0x01, 0x01], 257],
    [[0x01, 0xFF], 511],
    [[0x25, 0xA0], 9632],
    [[0x49, 0xA9], 18857],
    [[0x63, 0xA8], 25512],
    [[0x82, 0xA7], 33447],
    [[0xA4, 0x66], 42086],
    [[0xB5, 0x56], 46422],
    [[0xDA, 0x47], 55879],
    [[0xEB, 0x30], 60208],
    [[0xFE, 0xFE], 65278],
    [[0xFE, 0xFF], 65279],
    [[0xFF, 0xFE], 65534],
    [[0xFF, 0xFF], 65535]
];

test('DPT7 conversion', function (t) {
    t.plan(tests.length * 2);
    for (var i = 0; i < tests.length; i++) {
        var buf = new Buffer(tests[i][0]);
        var obj = tests[i][1];

        // backward test (object to raw data)
        var converted = dpt.formatAPDU(obj);
        t.deepEqual(converted, buf, `DPT7 formatAPDU ${JSON.stringify(obj)}`);

        // forward test (raw data to object)
        converted = dpt.fromBuffer(Buffer.from(buf));
        t.equal(converted, obj, `DPT7 fromBuffer ${JSON.stringify(buf)}`);
    }
    t.end();
});