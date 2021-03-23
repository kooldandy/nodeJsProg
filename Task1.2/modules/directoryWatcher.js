const EventEmitter = require("events");
const fs = require("fs");
const csvtojson = require("csvtojson");

class DirectoryWatcher extends EventEmitter {
  
  checkDirectoryForFiles (sourceFilePath, destinationFilePath) {
    const file = fs.readdirSync(sourceFilePath)[0];
    const filePath = destinationFilePath + "/" + "newFile.txt";

    fs.createReadStream(sourceFilePath + "/" + file)
      .pipe(csvtojson())
      .pipe(fs.createWriteStream(filePath))
      .on("close", () => {
        console.log(
          "\nThe file has been converted successfully to json format."
        );
      });
  };
}
module.exports = DirectoryWatcher;