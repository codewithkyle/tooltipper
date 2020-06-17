const fs = require("fs");
const path = require("path");

const tooltipperFile = path.join(__dirname, "tooltipper.js");
const tooltipperMinFile = path.join(__dirname, "tooltipper.min.js");

if (fs.existsSync(tooltipperFile)) {
    fs.unlinkSync(tooltipperFile);
}
if (fs.existsSync(tooltipperMinFile)) {
    fs.unlinkSync(tooltipperMinFile);
}
