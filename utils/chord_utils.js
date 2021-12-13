const ChordIllustrator = require("chord-illustrator");
const DOMParser = require("xmldom").DOMParser;
const document = new DOMParser().parseFromString("<html></html>");
const ci = new ChordIllustrator(document.createElement("div"));
var convert = require("xml-js");

const guitarArray = [6, 5, 4, 3, 2, 1];
exports.getChordSvg = async (response) => {
  const chordInfo = response;
  const strings = chordInfo.strings.split(" ");
  const chordName = chordInfo.chordName.split(",")[0];
  //   console.log("STRINGS", strings);
  const fingers = chordInfo.fingering.split(" ");
  let fingering = [];
  let mutedStrings = [];
  strings.forEach((item, index) => {
    if (fingers[index] !== "X") {
      fingering.push({ fret: item, string: guitarArray[index] });
    }
    if (item === "X") {
      mutedStrings.push("yes");
    } else {
      mutedStrings.push("no");
    }
  });
  //   console.log("FINGERING", fingering, mutedStrings.length);
  if (mutedStrings.length > 6) {
    mutedStrings.pop();
  }
  //   console.log("MUTED STRINGS", mutedStrings.length);
  const svg = ci.make({
    name: chordName,
    mutedStrings,
    fingering,
  });
  let stringSvg = svg.toString();
  let convertedXML = convert.xml2js(stringSvg, { compact: true });
  //   console.log(convertedXML);
  convertedXML["svg"]["_attributes"]["height"] = "141";
  convertedXML["svg"]["_attributes"] = {
    ...convertedXML["svg"]["_attributes"],
    width: "215",
  };
  convertedXML["svg"]["rect"]["_attributes"]["opacity"] = 1;
  convertedXML["svg"]["rect"]["_attributes"]["style"] = "opacity:1";
  convertedXML["svg"]["line"].forEach((item) => {
    item["_attributes"]["opacity"] = 1;
    item["_attributes"]["style"] = "opacity:1";
  });
  convertedXML["svg"]["circle"].forEach((item) => {
    item["_attributes"]["style"] = "opacity:1";
  });
  convertedXML["svg"]["text"].forEach((item) => {
    item["_attributes"]["fill"] = "rgb(255, 255, 255)";
  });
  let data = convert.js2xml(convertedXML, { compact: true, spaces: 2 });
  return data;
};
