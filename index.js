const fs = require('fs');
const fsPromises = fs.promises;
const inquirer = require('inquirer');

const html = require('./renderHtml');

const employees = [];

const Employee = require('./lib/Employee.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Manager = require('./lib/Manager.js');

let hasManager = false;

const writeScript = () => {
    
    let questions = [
        {
            type: 'list',
            message: 'Select a type of employee.',
            choices: ['engineer','intern'],
            name: 'employeeType',
            when: hasManager === true
        },
        {
            type: 'list',
            message: 'Select a type of employee.',
            choices: ['manager', 'engineer','intern'],
            name: 'employeeType',
            when: hasManager === false
        },
        {
            type: 'input',
            message: 'What is this employee\'s name?',
            name: 'name',
            validate: async (input) => {
                let regex = /^[' 'A-Za-z_-]+$/;
                if (!regex.test(input)) {
                   return 'Please enter a valid name.';
                }
                return true;
            }
        },
        {
            type: 'input',
            message: 'What is this employee\'s email?',
            name: 'email',
            // regex to validate that the email address has the correct form
            validate: async (input) => {
                let regex = /(^((\w+-)*\w+(\.(\w+-)*\w+)*@(\w+-)*\w+(\.([A-Za-z]{2,4})){1,4})$)/;
                if (!regex.test(input)) {
                   return 'Please enter a valid email address.';
                }
                return true;
              }
        },
        {
            type: 'number',
            name: 'other',
            message: 'What is this employee\'s office number?',
            validate: async (input) => {
                if (isNaN(input)) {
                   return 'Please enter a valid office number.';
                }
                return true;
            },
            when: (answers) =>  (answers.employeeType === 'manager')
         },
         {
            type: 'input',
            name: 'other',
            message: 'What is this employee\'s school?',
            when: (answers) => answers.employeeType === 'intern',
            validate: async (input) => {
                let regex = /^[' 'A-Za-z_-]+$/;
                if (!regex.test(input)) {
                   return 'Please enter a valid school.';
                }
                return true;
            }
         },
         {
            type: 'input',
            name: 'other',
            message: 'What is this employee\'s GitHub?',
            when: (answers) => answers.employeeType === 'engineer',
            validate: async (input) => {
                let regex = /^[\w-]+$/;
                if (!regex.test(input)) {
                   return 'Please enter a valid name.';
                }
                return true;
            }
         }
    ]

    const createEmployee = (employee, name, email, other) => {
        switch (employee) {
            case 'intern':
                return new Intern(name, email, other);
            case 'engineer':
                return new Engineer(name, email, other);
            case 'manager':
                hasManager = true;
                return new Manager(name, email, other);
            default:
                return new Employee(name, email, other);
        }
    }

    const setOtherData = (employee) => {
        otherData = ''
        switch (employee) {
            case 'intern':
                otherData =  'school';
                break;
            case 'engineer':
                otherData = 'github';
                break;
            case 'manager':
                otherData = 'officeNumber';
                break;
            default:
                return;
        } 
           return otherData;
    }
    let template = fs.readFileSync('./templates/main.html','utf8');
    const enterAnotherEmployee = () =>{
        inquirer
          .prompt([
            {
                type: "confirm",
                name: "again",
                message: "Anyone else?",
                when: hasManager === true,
                default: true
            },
            {
                // type: "confirm",
                name: "again1",
                message: "You need to add a manager. Anyone else?",
                when: (val) => (!val.again && !hasManager),
                default: true
            }
          ])
          .then(value => {
            // If the user says yes to enter another employee, ask for more employees, otherwise, done.
            if (value.again || value.again1 || !hasManager) {
              writeScript();
            } else {
              data = html.getEmployeeOfType(['Manager','Engineer','Intern'],employees)
              template = template.replace(html.getPattern('main'), data)
              let i = 0;
              // this is the initial filename
              let filename = 'myTeam';
              const writeFile = (file) => {
                // creates a directory name generated-files and if it already exists, opens for saving
                fs.mkdirSync(`./generated-files/`, { recursive: true })
                // saves file with filename 'filename'
                fs.writeFile(`./generated-files/${file}.html`,template, { flag: "wx" }, (err) => {
                    // if the filename already exists, add 1,2,3... to the end and try again with
                    // that filename
                    if (err) {
                        writeFile(filename + ++i);
                        // just letting the user know where they can find the new file.
                    } else {
                        console.log(`you\'re done open the new "generated-files/${file}.html"`)
                    }
                })
              }; writeFile(filename); 
            }
          });
      };

    let data = '';

    inquirer
        .prompt(questions)
        .then(async (answers) => {
            let employee = answers.employeeType;
            let name = answers.name;
            let email = answers.email;
            let other = answers.other;
            let newHireData = createEmployee(employee, name, email, other);
            newHireData[setOtherData(employee)].toString()
            employees.push(newHireData);
            enterAnotherEmployee();
        });
}
writeScript()






