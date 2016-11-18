module.exports = {
    id: 10,
    base: {
        desc: "day of week + time of day",
        beforeDeserialize: function () {
            return new Date(2000, 0, 1, 0, 0, 0);
        },
        props: []
    },
    subs: {
        // 10.001 time of day
        "001": {
            "name": "DPT_TimeOfDay", "desc": "time of day"
        }
    }
};