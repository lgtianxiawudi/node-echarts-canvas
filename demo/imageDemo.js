var node_echarts = require('../index.js');
var path = require('path');

var option = {
    "legend": {
        "textStyle": {"fontSize": 20, "rich": {"a": {"width": 20.0, "float": "right"}}},
        "top": "center",
        "right": "5",
        "orient": "vertical"
    },
    "graphic": {
        "elements": [{
            "type": "image",
            "style": {
                "image": "data:image/gif;base64,R0lGODdhMAAwAPAAAAAAAP///ywAAAAAMAAwAAAC8IyPqcvt3wCcDkiLc7C0qwyGHhSWpjQu5yqmCYsapyuvUUlvONmOZtfzgFzByTB10QgxOR0TqBQejhRNzOfkVJ+5YiUqrXF5Y5lKh/DeuNcP5yLWGsEbtLiOSpa/TPg7JpJHxyendzWTBfX0cxOnKPjgBzi4diinWGdkF8kjdfnycQZXZeYGejmJlZeGl9i2icVqaNVailT6F5iJ90m6mvuTS4OK05M0vDk0Q4XUtwvKOzrcd3iq9uisF81M1OIcR7lEewwcLp7tuNNkM3uNna3F2JQFo97Vriy/Xl4/f1cf5VWzXyym7PHhhx4dbgYKAAA7",
                "width": "50",
                "height": "50"
            },
            "left": "center",
            "top": "45%"
        }, {"type": "text", "left": "center", "top": "45%", "style": {"text": ["总人数"]}}]
    },
    "series": [{
        "type": "pie",
        "emphasis": {"label": {"fontWeight": "bold", "fontSize": 40, "show": false}},
        "data": [{"name": "{a|1}{b|23}", "value": 23}, {"name": "{a|2}{b|75}", "value": 75}, {
            "name": "{a|3}{b|43}",
            "value": 43
        }, {"name": "{a|4}{b|100}", "value": 100}],
        "labelLine": {"show": false},
        "label": {"fontWeight": "bold", "show": false},
        "radius": ["40%", "60%"],
        "avoidLabelOverlap": false
    }]
};

module.exports = option

node_echarts({
    path: __dirname + '\\imageDemo.png',
    option: option,
    width: 1000,
    height: 500
})

