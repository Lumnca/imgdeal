var express = require("express");
var app = express();
var multer = require("multer");
var fs = require("fs");
// var upload=multer({ dest: './tmp/' })

var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};

var uploadFolder = "./uploads/";

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
    },
  fieldname : 'file'
});
app.use(express.static(__dirname));

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage });

app.post("/profile", upload.single("file"), function (req, res, next) {
  //req.body contains the text fields
  //console.log(req.file, "------", req.body, "-------");
  console.log(new Date() + " 上传图片" + req.file.filename);
  res.end("上传成功!");
});

app.listen(3000);

const child_process = require('child_process');

var openURL = function (url) {
  // 判断平台
  switch (process.platform) {
    // Mac 使用open
    case "darwin":
      child_process.spawn('open', [url]);
      break;
    // Windows使用start
    case "win32":
      child_process.spawn('start', [url]);
      break;
    // Linux等使用xdg-open
    default:
      child_process.spawn('xdg-open', [url]);
  }
};

openURL("http://127.0.0.1:3000/");
