module.exports = {
    id: 11,
    base: {
        desc : "3-byte date value",
        beforeDeserialize: function() {return new Date(2000, 0, 1, 0, 0,0);},
        props: [

        ]
    },
    subs: {
        //11.001 date
        "001": {
            name: "DPT_Date", desc: "Date"
        }
    }
};