const utils = require("../utils/chord_utils");
const constants = require("../utils/constants");
const chordList = require("../mock/chords");

exports.getChord = async (req, res) => {
  console.log(req.query);
  if (req.query.chord) {
    const chordToFind = req.query.chord;
    try {
      //console.log(chordList.chords);
      const response = chordList.chords[chordToFind];
      console.log(response);
      if (response && response.length > 0) {
        console.log(response);
        let chords = response.map((item) => item.chordName.replace(/,/g, ""));
        console.log(chords);
        res.json(chords);
      }
    } catch (err) {
      console.log("FETCH ERR", err);
    }
  } else {
    res.json({ error: "please specify a chord to find" });
  }
};

exports.getChordByName = async (req, res) => {
  console.log("NAME", req.params.name);
  let response = null;
  if (req.params.name) {
    const chordToFind = req.params.name;
    try {
      for (const property in chordList.chords) {
        chordList.chords[property].forEach((item) => {
          if (item.chordName === chordToFind) {
            response = item;
          }
        });
      } //await axios.get(`${constants.CHORDS_API_URL}${chordToFind}`, {timeout: 10000, timeoutErrorMessage: "request timeout"}).catch((err) => {res.json(err)});
      if (response) {
        console.log(response);
        let data = await utils.getChordSvg(response);
        res.json(data);
      } else {
        console.log("response else", response);
      }
    } catch (err) {
      console.log("FETCH ERR", err);
    }
  } else {
    res.json({ error: "please specify a chord to find" });
  }
};
