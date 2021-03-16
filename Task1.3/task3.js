import { DirectoryWatcher } from "./modules";

const directoryWatcher = new DirectoryWatcher();

directoryWatcher.checkDirectoryForFiles(
  `${process.cwd()}/csv`,
  `${process.cwd()}/text`
);