import boxen from "boxen";
import chalk from 'chalk';
import inquirer from 'inquirer';
import clear from 'clear';
import open from 'open';

// clear the terminal before showing the npx card
clear()

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
            {
                // Use chalk to style headers
                name: `Toss an ${chalk.bold("email")}?`,
                value: () => {
                    open("mailto:colehausman@gmail.com");
                    console.log("\nLooking forward to hearing your message and replying to you!\n");
                }
            },
            {
                name: "Exit",
                value: () => {
                    console.log("Good bye, have a nice day!\n");
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
