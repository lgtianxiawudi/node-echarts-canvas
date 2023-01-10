const { createCanvas } = require("canvas");
const cloud = require("d3-cloud");

var fs = require('fs');

const words = ["Hello", "world", "normally", "you", "want", "more", "words", "than", "this"]
    .map(function(d) {
        return {text: d, size: 10 + Math.random() * 90};
    });
var canvas = createCanvas(100, 100);
var start = cloud().size([100, 100])
    .canvas(() => canvas)
    .words(words)
    .padding(5)
    .rotate(() => Math.floor(Math.random() * 2) * 90)
    .font("Impact")
    .fontSize(d => d.size)
    .on("end", words => console.log(JSON.stringify(words)))
    .start();

const buf3 = canvas.toBuffer('image/jpeg')
fs.writeFileSync(__dirname + '/wordcloud.png', buf3);