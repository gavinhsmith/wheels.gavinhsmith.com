const express = require("express");
const Handlebars = require("handlebars");
const { readFile } = require("fs");
const { join } = require("path");

const LAYOUTS_PATH = join(process.cwd(), "./src/pages/layouts");
const PAGES_PATH = join(process.cwd(), "./src/pages/content");
const PUBLIC_PATH = join(process.cwd(), "./src/public");
const CSS_OUT = join(process.cwd(), "./dist/css");

const app = express();

app.use(express.static(PUBLIC_PATH));

app.use("/css", express.static(CSS_OUT));

app.use((req, res, next) => {
  console.info(`Request: ${req.path}`);

  let fileUri = req.path.slice(req.path.lastIndexOf("/")).includes(".")
    ? req.path
    : join(req.path, "index.hbs");

  if (!fileUri.includes("hbs")) next();

  readFile(join(PAGES_PATH, fileUri), "utf-8", (error, ogFileData) => {
    if (error) {
      console.warn(error);
      next();
    } else {
      readFile(join(process.cwd(), "./vars.json"), "utf-8", (err, rawVars) => {
        if (err) {
          console.warn(error);
          next();
        } else {
          const vars = JSON.parse(rawVars);

          let template = null;
          if (ogFileData.slice(0, ogFileData.indexOf("\n")).startsWith("[[")) {
            template = ogFileData
              .slice(0, ogFileData.indexOf("\n"))
              .slice(2, -2);
          }

          let out = Handlebars.compile(
            ogFileData.slice(ogFileData.indexOf("\n"))
          )({
            ...vars.global,
            ...vars[fileUri.replace("\\", "/").replaceAll("hbs", "html")],
          }).trim();

          if (template != null) {
            readFile(
              join(LAYOUTS_PATH, `${template}.hbs`),
              "utf-8",
              (err, rawTemplate) => {
                if (err) {
                  console.warn(error);
                  next();
                } else {
                  out = Handlebars.compile(rawTemplate)({
                    content: out,
                    ...vars.global,
                    ...vars[
                      fileUri.replace("\\", "/").replaceAll("hbs", "html")
                    ],
                  }).trim();

                  res.status(200);
                  res.header("Content-Type", "text/html");
                  res.send(out);
                  res.end();
                }
              }
            );
          } else {
            res.status(200);
            res.header("Content-Type", "text/html");
            res.send(out);
            res.end();
          }
        }
      });
    }
  });
});

app.use((req, res) => {
  readFile(join(PAGES_PATH, "./404.hbs"), "utf-8", (error, ogFileData) => {
    if (error) {
      console.warn(error);
      next();
    } else {
      readFile(
        join(LAYOUTS_PATH, `./main.hbs`),
        "utf-8",
        (err, rawTemplate) => {
          if (err) {
            console.warn(error);
            next();
          } else {
            out = Handlebars.compile(rawTemplate)({
              content: Handlebars.compile(
                ogFileData.slice(ogFileData.indexOf("\n"))
              )().trim(),
            }).trim();

            res.status(404);
            res.header("Content-Type", "text/html");
            res.send(out);
            res.end();
          }
        }
      );
    }
  });
});

app.listen(3000);

console.info("Starting dev server...");
