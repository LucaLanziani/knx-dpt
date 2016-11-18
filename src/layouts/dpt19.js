module.exports = {
    id: 19,
    base: {
        desc: "8-byte Date+Time",
        beforeDeserialize: function () {
            return new Date(2000, 0, 1); // Has to be a month with 31 days
        },
        props: [
            {type: "skip", size: 8},
            {type: "bool", index: {get: function(d) { return d.getTimezoneOffset() < Math.max(new Date(d.getFullYear(), 0, 1).getTimezoneOffset(), new Date(d.getFullYear(), 6, 1).getTimezoneOffset()) ? 1 : 0}, set: function(){}}}, // TODO: Use this value to set the timezone offset on the date
            {type: "skip", size: 5},
            {type: "skip", size: 1}, // TODO: Implement some mechanism to check if it is a working day (include holidays etc)
            {type: "skip", size: 1},
            {type: "uint", size: 6, index: {get: function(d) { return d.getSeconds();}, set: function(d,v) {d.setSeconds(v);}}, range: [0,59]},
            {type: "skip", size: 2},
            {type: "uint", size: 6, index: {get: function(d) { return d.getMinutes();}, set: function(d,v) {d.setMinutes(v);}}, range: [0,59]},
            {type: "skip", size: 2},
            {type: "uint", size: 5, index: {get: function(d) { return d.getHours();}, set: function(d,v) {d.setHours(v);}}, range: [0,24]},
            {type: "uint", size: 3, index: {get: function(d) { return d.getDay();}, set: function() {}}, range: [0,7]},
            {type: "uint", size: 5, index: {get: function(d) { return d.getDate();}, set: function(d,v) {d.setDate(v);}}, range: [1,31]},
            {type: "skip", size: 3},
            {type: "uint", size: 4, index: {get: function(d) { return d.getMonth() + 1;}, set: function(d,v) {d.setMonth(v - 1);}}, range: [1,12]},
            {type: "skip", size: 4},
            {type: "uint", size: 8, index: {get: function(d) { return d.getFullYear() -1900;}, set: function(d,v) {d.setFullYear(v + 1900);}}, range: [0,255]}
        ]
    },
    subs: {
        "001": {
            "name": "DPT_DateTime", "desc": "datetime"
        },
    }
};