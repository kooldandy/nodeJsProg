const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


const reverseString = function(){
  readline.question("Please enter any string to reverse.\n", value => {
    const revere = value.toString().split("").reverse().join("");
    console.log(revere);
    readline.close();
  });
}

reverseString();