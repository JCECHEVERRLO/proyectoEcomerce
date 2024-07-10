const fs = require('fs');


function LoginLog(message){
    fs.writeFile('log.txt', message , (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('El archivo se creó correctamente');
        }
    });
}

async function ReadLog() {
    const filename = 'log.txt';
  
    try {
      const data = await fs.promises.readFile(filename, 'utf-8');
      return data;
    } catch (err) {
      console.error(err);
      return null; // Or throw an error if desired
    }
  }

module.exports = { LoginLog, ReadLog }