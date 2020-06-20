const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const { log } = require("console");
const chalk = require("chalk");
const ejs = require("ejs");
chalk.level = 3;
const componentFAQ = [
  {
    name: "component",
    type: "input",
    message: "Please enter a component name:",
    validate(val) {
      if (val === "") {
        return "Name is required! 🔪🔪🔪🔪🔪🔪🔪🔪🔪";
      } else {
        return true;
      }
    },
  },
];

const pathFAQ = [
  {
    name: "path",
    type: "input",
    message: "Please enter the path to create a component:",
    validate(val) {
      return isPath(val);
    },
  },
];

const isPath = (r) => {
  return fs.statSync(process.cwd() + "/" + r).isDirectory();
};

const action = (component, path) => {
  if (typeof path === "string" && !isPath(path)) {
    log(chalk.red("Error: No path found! 🔪🔪🔪🔪🔪🔪🔪🔪🔪"));
    process.exit();
  }

  if (typeof component === "string" && typeof path === "string") {
    run(component, path);
  }

  if (typeof component === "string" && typeof path !== "string") {
    inquirer.prompt(pathFAQ).then((answers) => {
      const { path } = answers;
      run(component, path);
    });
  }

  if (typeof component !== "string" && typeof path === "string") {
    inquirer.prompt(componentFAQ).then((answers) => {
      const { component } = answers;
      run(component, path);
    });
  }
};

const fileName = (e) => {
  return {
    "tsx.txt": `${e}.tsx`,
    "css.txt": `${e}.scss`,
    "type.txt": "type.ts",
  };
};

const run = (name, enterPath) => {
  const readDir = path.join(__dirname, "../components");
  const writeDir = path.join(process.cwd(), enterPath, name);

  fs.readdir(readDir, (error, files) => {
    if (error) throw error;

    fs.mkdir(writeDir, () => {
      log("\n" + chalk.green.bold("Output:")+"\n");
      files.map((item, i) => {
        ejs.renderFile(path.join(readDir, item), { name }, (error, res) => {
          if (error) throw error;

          fs.writeFileSync(path.join(writeDir, fileName(name)[item]), res);
          log("      "+chalk.blueBright.bold(`${fileName(name)[item]}   👏👏👏`))
        });
      });
      log("\n")
    });
  });
};

module.exports = { action };
