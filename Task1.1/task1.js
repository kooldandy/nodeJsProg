const through2 = require("through2");

const reverseString = () => {
  console.log("Please enter any string to reverse.\n");
  process.stdin
    .pipe(
      through2(function write(buffer, encoding, next) {
        this.push(buffer.toString().split("").reverse().join(""));
        this.push("\n");
        next();
      })
    )
    .pipe(process.stdout);
};

reverseString();