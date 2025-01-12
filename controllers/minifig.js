const { exec } = require("child_process");
const path = require('path');

function os_func() {
  this.execFunction = function (cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`${cmd} err: ${error}`);
        return;
      }
      callback(stdout);
    });
  };
}
let os = new os_func();

exports.getMinifig = async (req, res) => {
  try {
    os.execFunction('node ./generate.js', function (stdout) {
      console.log({stdout});
      if (stdout[0] === 'M') {
        res.status(200).sendFile(path.join(__dirname, '../minifig.svg'));
      } else {
        res.status(400).send(`Something went wrong: ${stdout}`);
      }
    });
  } catch (error) {
    res.status(400).send(`Something went wrong: ${error}`);
  }
};