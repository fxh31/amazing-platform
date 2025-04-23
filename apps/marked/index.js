const ejs = require("ejs");
const fs = require("fs");
const marked = require("marked");
const browserSync = require("browser-sync");

let browser;
const server = () => {
  browser = browserSync.create();
  browser.init({
    server: {
      baseDir: "./",
      index: "index.html",
    },
  });
};

const init = (callback) => {
  const md = fs.readFileSync("README.md", "utf8");
  console.log(md);
  ejs.renderFile(
    "template.ejs",
    {
      content: marked.parse(md),
      title: "markdown to html",
    },
    (err, data) => {
      if (err) throw err;
      fs.writeFileSync("index.html", data);
      callback && callback();
    }
  );
};

fs.watchFile("README.md", (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    init(() => {
      browser.reload();
    });
  }
});
init(() => {
  server();
});
