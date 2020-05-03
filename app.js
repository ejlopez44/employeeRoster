const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const getManager = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: 'What is your manager\'s name?'
        },
        {
            type: "input",
            name: "id",
            message: 'What is your manager\'s id?'
        },
        {
            type: "input",
            name: "email",
            message: 'What is your manager\'s email?'
        },
        {
            type: "input",
            name: "officeNumber",
            message: 'What is your manager\'s office number?'
        },
    ]).then(function (answer) {
        const manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
        employeeArr.push(manager)
        addTeamMember()
    })
}

const addTeamMember = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "nextTeamMember",
            message: 'Which type of team member would you like to add?',
            choices: ["Engineer", 'Intern', 'I do not want to add a team member']
        }
    ]).then(function (res) {

        if (res.nextTeamMember === 'Engineer') {
            getEngineer()
        }
        else if (res.nextTeamMember === 'Intern') {
            getIntern()
        } else {
            // console.log(employeeArr)
            const html = render(employeeArr)
            // fs.mkdirSync()
            // fs.writeFileSync('team.html', html)
            fs.mkdirSync('output')
            fs.writeFileSync(outputPath, html)
        }
    });
}

const getEngineer = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: 'What is your engineer\'s name?'
        },
        {
            type: "input",
            name: "id",
            message: 'What is your engineer\'s id?'
        },
        {
            type: "input",
            name: "email",
            message: 'What is your engineer\'s email?'
        },
        {
            type: "input",
            name: "officeNumber",
            message: 'What is your engineer\'s Github username?'
        },
    ]).then(function (answer) {
        const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        employeeArr.push(engineer)
        addTeamMember()
    })
}

const getIntern = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: 'What is your intern\'s name?'
        },
        {
            type: "input",
            name: "id",
            message: 'What is your intern\'s id?'
        },
        {
            type: "input",
            name: "email",
            message: 'What is your intern\'s email?'
        },
        {
            type: "input",
            name: "school",
            message: 'What is your intern\'s school?'
        },
    ]).then(function (answer) {
        const intern = new Intern(answer.name, answer.id, answer.email, answer.school)
        employeeArr.push(intern)
        addTeamMember()
    })
}
const employeeArr = []

getManager()



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
