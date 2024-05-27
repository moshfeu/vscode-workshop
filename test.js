const fs = require('fs');
const path = require('path');

`vscode is the best IDE`.split('').forEach((char, index) => {
  fs.writeFileSync(path.join(__dirname, 'excercises', 'moving-tabs', `${index}.md`), `${' '.repeat(index)}${char}`);
});