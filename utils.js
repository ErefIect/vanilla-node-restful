const fs = require("fs");

function writeDataToFile(filename, content) {
  if (!fs.existsSync(filename)) {
    console.log(`Error: ${filename} does not exist`);
    return;
  }

  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      // 判断请求方式，如果是 PUT 请求则设置其高水位线
      // 该设置会自动暂停流的传输，不会触发 'end' 事件
      if (req.method === "PUT") {
        req.pause();
      }

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        console.log("post data:", body);
        resolve(body);
      });

      // 监听 'readable' 事件，如果是 PUT 请求，则恢复流的传输
      if (req.method === "PUT") {
        req.on("readable", () => {
          let chunk;
          while (null !== (chunk = req.read())) {
            body += chunk.toString();
          }
        });

        // 恢复流的传输，并触发 'end' 事件
        req.on("end", () => {
          resolve(body);
        });

        req.resume();
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  writeDataToFile,
  getPostData,
};
