// Modules
const {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  cpSync,
} = require("fs");
const Handlebars = require("handlebars");
const { join } = require("path");

// Constants
const LAYOUTS_PATH = join(process.cwd(), "./src/pages/layouts");
const PAGES_PATH = join(process.cwd(), "./src/pages/content");
const PUBLIC_PATH = join(process.cwd(), "./src/public");
const OUT_PATH = join(process.cwd(), "./dist");

console.debug(PAGES_PATH);

// Build

console.info("Building pages...");

if (!existsSync(OUT_PATH)) {
  mkdirSync(OUT_PATH);
}

// Pages first

const vars = JSON.parse(
  readFileSync(join(process.cwd(), "./vars.json"), "utf-8")
);

for (const file of readdirSync(PAGES_PATH, {
  withFileTypes: true,
  recursive: true,
})) {
  if (
    !file.isDirectory() &&
    file.name.split(".")[file.name.split(".").length - 1] === "hbs"
  ) {
    const outPath = join(
      file.parentPath.slice(PAGES_PATH.length),
      file.name.startsWith("\\")
        ? file.name
        : `\\${file.name.replaceAll("hbs", "html")}`
    );

    const ogFileData = readFileSync(join(file.parentPath, file.name), "utf-8");

    let template = null;
    if (ogFileData.slice(0, ogFileData.indexOf("\n")).startsWith("[[")) {
      template = ogFileData.slice(0, ogFileData.indexOf("\n")).slice(2, -2);
    }

    console.info(
      `Building "${outPath}" file with ${
        template != null ? `template "${template}"` : "no template"
      }...`
    );

    let out = Handlebars.compile(ogFileData.slice(ogFileData.indexOf("\n")))({
      ...vars.global,
      ...vars[outPath.replace("\\", "/")],
    }).trim();

    if (template != null) {
      out = Handlebars.compile(
        readFileSync(join(LAYOUTS_PATH, `${template}.hbs`), "utf-8")
      )({
        content: out,
        ...vars.global,
        ...vars[outPath.replace("\\", "/")],
      }).trim();
    }

    writeFileSync(join(OUT_PATH, outPath), out, "utf-8");
  } else {
    console.info(
      `Making "${join(
        file.parentPath.slice(PAGES_PATH.length),
        file.name.startsWith("\\") ? file.name : `\\${file.name}`
      )}" directory...`
    );

    mkdirSync(
      join(OUT_PATH, file.parentPath.slice(PAGES_PATH.length), file.name)
    );
  }
}

// Static assets

console.info("Copying static assets...");

cpSync(PUBLIC_PATH, OUT_PATH, { recursive: true });

console.info("Done!");
