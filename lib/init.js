// 交互式命令行
const inquirer = require("inquirer");
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;

const fs = require("fs");
const chalk = require("chalk");
const { log } = require("console");
chalk.level = 3;

const question = [
  {
    name: "name",
    type: "input",
    message: "Please enter a project name:",
    validate(val) {
      if (val === "") {
        return "Name is required! 🔪🔪🔪🔪🔪🔪🔪🔪🔪";
      } else {
        return true;
      }
    },
  },
];

const action = (item) => {
  if (typeof name === "string") {
    run(item);
  } else {
    inquirer.prompt(question).then((answers) => {
      const { name } = answers;
      run(name);
    });
  }
};

const clone = async (name, callback) => {
  const url = "https://gitee.com/Hippo_EveIvan/react-ts-template.git";
  const res = await spawn(`git`, ["clone", url, name], { stdio: "inherit" });
  res.on("close", function (code) {
    log(chalk.green("-------------------------- Finished with clone  💩"));
    return callback(true);
  });
};

const changeFile = (name) => {
  fs.readFile(`${process.cwd()}/${name}/package.json`, (err, data) => {
    if (err) {
      log(chalk.red("Error:  🔪 failed to read file         🔪🔪🔪🔪🔪"));
      process.exit();
    }
    log(
      chalk.green("-------------------------- Finished with read file  😈")
    );
    data = JSON.parse(data.toString());
    data.name = name;
    fs.writeFile(
      `${process.cwd()}/${name}/package.json`,
      JSON.stringify(data, "", "\t"),
      (err) => {
        if (err) {
          log(chalk.red("Error: failed to write file 😈😈😈😈😈"));
          process.exit();
        }
        log(chalk.green("-------------------------- Finished with write file 😱"));
      }
    );
  });
};

const remove = async (name) => {
  const res = spawn(`rm`, ["-rf", `${process.cwd()}/${name}/.git`], {
    stdio: "inherit",
  });
  res.on("close", (code) => {
    log(chalk.green("-------------------------- Finished with remove 😶"));
  });
};

const yarn = async (name) => {
  const res = spawn(`yarn`, ["--cwd", `${name}/`], { stdio: "inherit" });
  res.on("close", (code) => {
    log(chalk.green("😪 😊 👂 🐒 🚀 🌲 🍰 🥿 done  😡 🦢 🎫 🏷️  👎 🚗 ✈️  🚢 🐭 🎩 🔨 "));
    process.exit();
  });
};

const run = (name) => {
  clone(name, (status) => {
    if (status) {
      remove(name);
      changeFile(name);
      yarn(name);
    }
  });
};

module.exports = {
  action,
};
