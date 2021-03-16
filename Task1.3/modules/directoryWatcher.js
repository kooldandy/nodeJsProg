import EventEmitter from "events";
import fs from "fs";
import csvtojson from "csvtojson";

class DirectoryWatcher extends EventEmitter {
  checkDirectoryForFiles = (sourceFilePath, destinationFilePath) => {
    var file = fs.readdirSync(sourceFilePath)[0];
    var filePath1 = destinationFilePath + "/" + "newFile.txt";
    fs.createReadStream(sourceFilePath + "/" + file)
      .pipe(csvtojson())
      .pipe(fs.createWriteStream(filePath1))
      .on("close", () => {
        console.log(
          "\nThe file has been converted successfully to json format."
        );
      });
  };
}
module.exports = DirectoryWatcher;