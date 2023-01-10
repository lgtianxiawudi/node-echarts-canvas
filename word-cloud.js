var d3 = require('d3');
var jsdom = require('jsdom');
const nodeHtmlToImage = require('node-html-to-image')
const { JSDOM } = jsdom;
const cloud = require("d3-cloud");
const { createCanvas,Image } = require("canvas");
const fs = require("fs");

/**
 * @param config = {
        width: 500 // Image width, type is number.
        height: 500 // Image height, type is number.
        option: [], // words
    }

 *
 */
module.exports = function (config,response) {
    const { document } = (new JSDOM(``)).window;
    var fill = d3.scale.category20();
    var canvas = createCanvas(1, 1);
    var layout = cloud()
        .canvas(() => canvas)
        .size([config.width, config.height])
        .words(config.option.map(function(d) {
            return {text: d, size: 10 + Math.random() * 50, test: "haha"};
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 50; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", async (words)=> {
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
            var image = await nodeHtmlToImage({
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
            });
            response.writeHead(200, { 'Content-Type': 'image/png' });
            response.end(image, 'binary');
        });

    var start = layout.start();
}