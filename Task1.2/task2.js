const { DirectoryWatcher } = require("./modules");

const directoryWatcher = new DirectoryWatcher();

directoryWatcher.checkDirectoryForFiles(
  `${process.cwd()}/csv`,
  `${process.cwd()}/text`
);