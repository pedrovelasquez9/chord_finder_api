module.exports = function(app) {
    const controller = require("../controllers/chords");
    app.route("/chords").get(controller.getChord);
    app.route("/chord/:name").get(controller.getChordByName);
}