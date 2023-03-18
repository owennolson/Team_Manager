const fs = require("fs");
const inquirer = require('inquirer');

// Define classes for different team members
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return 'Employee';
    }
}

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole() {
        return 'Manager';
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getRole() {
        return 'Engineer';
    }

    getGithub() {
        return this.github;
    }
}

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getRole() {
        return 'Intern';
    }

    getSchool() {
        return this.school;
    }
}

const teamMembers = [];

// Prompt user for team manager's information
async function promptManager() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the team manager's name?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the team manager's employee ID?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the team manager's email address?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the team manager's office number?",
            validate: answer => answer !== ''
        }
    ]);

    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);

    console.log(`\nTeam manager ${manager.name} has been added to the team!\n`);
}

// Prompt user for engineer's information
async function promptEngineer() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the engineer's name?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's employee ID?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email address?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the engineer's GitHub username?",
            validate: answer => answer !== ''
        }
    ]);

    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);

    console.log(`\nEngineer ${engineer.name} has been added to the team!\n`);
}

// Prompt user for intern's information
async function promptIntern() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the intern's name?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's employee ID?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email address?",
            validate: answer => answer !== ''
        },
        {
            type: 'input',
            name: 'school',
            message: "What school does the intern attend?",
            validate: answer => answer !== ''
        }
    ]);

    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);

    console.log(`\nIntern ${intern.name} has been added to the team!\n`);
}

// Start the application
async function startApp() {
  console.log('Welcome to the Team Manager application!');

  // Prompt the user for the team manager's information
  await promptManager();

  // Prompt the user for the team's engineers and interns
  let done = false;
  while (!done) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Add an engineer', 'Add an intern', 'Finish building my team']
    });

    switch (action) {
      case 'Add an engineer':
        await promptEngineer();
        break;
      case 'Add an intern':
        await promptIntern();
        break;
      case 'Finish building my team':
        done = true;
        break;
    }
  }
  console.log('Team building is complete!');

  // generate HTML content
  const html = generateHTML(teamMembers);

  // write HTML content to file
  fs.writeFile('team.html', html, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('HTML file has been generated!');
  });
}

function generateHTML(teamMembers) {
    // generate HTML code here
    return html;
  }
// Call the startApp function to start the application
startApp();
