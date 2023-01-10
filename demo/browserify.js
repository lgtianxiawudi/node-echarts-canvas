var d3 = require('d3');
var jsdom = require('jsdom');
const nodeHtmlToImage = require('node-html-to-image')
const { JSDOM } = jsdom;
const { document } = (new JSDOM(``)).window;
const cloud = require("d3-cloud");
const { createCanvas,Image } = require("canvas");
const fs = require("fs");

var fill = d3.scale.category20();
var canvas = createCanvas(1, 1);
var layout = cloud()
    .canvas(() => canvas)
    .size([500, 200])
    .words([
      "Hello", "world", "normally", "you", "want", "more", "words",
      "than", "this"].map(function(d) {
      return {text: d, size: 10 + Math.random() * 90, test: "haha"};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; })
    .on("end", (words)=>{
        d3.select(document.body).append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
        nodeHtmlToImage({
            output: 'C:\\Users\\15900\\Desktop\\a.png',
            html: `<html>
                    <head>
                      <style>
                        body {
                          width: `+layout.size()[0]+`px;
                          height: `+layout.size()[1]+`px;
                        }
                      </style>
                    </head>
                    <body>`+document.body.innerHTML+`</body>
                  </html>
                  `
        })
            .then(() => console.log('The image was created successfully!'))
    });

var start = layout.start();
