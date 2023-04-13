#!/usr/bin/env node

'use strict'

const boxen = require("boxen");
const chalk = require("chalk");
const inquirer = require("inquirer");
const clear = require("clear");
const open = require("open");
const fs = require('fs');
const request = require('request');
const path = require('path');
const ora = require('ora');
const DownloaderHelper = require('node-downloader-helper');
const cliSpinners = require('cli-spinners');
clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:colehausman@gmail.com");
                    console.log("\nDone, see you soon at inbox.\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Resume',
                        spinner: cliSpinners.material,
                    }).start();
                    /*
                    const download = new DownloaderHelper('http://github.com/ColeH02/about-me/blob/main/ColeHausmanResume.pdf', './');

                    download.on("end", function () {
                        let downloadPath = path.join(process.cwd(), 'cole_hausman-resume.pdf')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                    download.start();
                    */

                    let pipe = request('https://raw.githubusercontent.com/ColeH02/about-me/main/ColeHausmanResume.pdf').pipe(fs.createWriteStream('./cole_hausman-resume.pdf'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'cole_hausman-resume.pdf')
                        console.log(`\nResume Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("See ya!.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.hex('#ffffff').bold("                     Cole Hausman"),
    fact: chalk.hex('#d2dee4')('If at first you dont succeed try try try try try again'),
    email: chalk.hex('#a6bdc9')("colehausman@gmail.com"),
    github: chalk.hex('#7b9eaf')("https://github.com/ColeH02"),
    website: chalk.hex('#4d7f96')("https://colehausman.com"),
    npx: chalk.hex('#0e627d')("npx colehausman"),

    labelFact: chalk.hex('#e407d2').bold("          Fun Fact:"),
    labelEmail: chalk.hex('#be0fc4').bold("          Email:"),
    labelGitHub: chalk.hex('#9912b5').bold("         GitHub:"),
    labelWebsite: chalk.hex('#7513a4').bold("        Website:"),
    labelCard: chalk.hex('#511191').bold("                  Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelFact}  ${data.fact}`,
        ``,
        `${data.labelEmail}  ${data.email}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelWebsite}  ${data.website}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.bold(
            "Hi there! I'm Cole, I'm a passionate developer!"
        )}`,
        `${chalk.bold("Student at Bucknell University and currently")}`,
        `${chalk.bold(
            "working as a ServiceNow Intern. Hit me up if you"
        )}`,
        `${chalk.bold(
            "want to connect!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "blue"
    }
);

// Show the boxen
console.log(me);

prompt(questions).then(answer => answer.action());
