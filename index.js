#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import chalk from "chalk";

if (process.argv.length < 3) {
  console.log("You have to provide a name to your app.");
  console.log("For example :");
  console.log(chalk.bgBlue("npx new-express-app my-app"));
  process.exit(1);
}
const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "git@github.com:heyitsuzair/express-js-boilerplate.git";

console.log(chalk.bgBlue(`new-express-app 1.0.1 by Muhammad Uzair`));

try {
  fs.mkdirSync(projectPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log(
      `The project ${projectName} already exist in the current directory, please give it another name.`
    );
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function main() {
  try {
    console.log("Downloading files...");
    execSync(`git clone ${git_repo} "${projectPath}"`);

    process.chdir(projectPath);

    console.log("Installing dependencies...");
    execSync("npm install");

    console.log("Removing useless files");
    execSync("npx rimraf ./.git");

    console.log(
      chalk.bgBlue(
        "Your Project Is Now Ready To Use. Follow The Instructions Below To Start Project:"
      )
    );
    console.log(chalk.yellow(`Define Your MongoDB URL In '.env' file`));
    console.log(chalk.yellow(`cd ${projectName}`));
    console.log(chalk.yellow(`npm start`));
    console.log(
      chalk.green("Star the repo: https://github.com/heyitsuzair/express-setup")
    );
    console.log(
      chalk.green("Connect with me: https://linkedin.com/in/uzair-dev")
    );
  } catch (error) {
    console.log(error);
  }
}
main();
