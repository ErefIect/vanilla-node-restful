const fs = require("fs");

function writeDataToFile(filename, content) {

  if (!fs.existsSync(filename)) {
    console.log(`Error: ${filename} does not exist`);
    return;
  }

  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                console.log("post data:", body)
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
  writeDataToFile,
  getPostData,
};
