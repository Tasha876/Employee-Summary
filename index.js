const fs = require('fs');
const fsPromises = fs.promises;
const inquirer = require('inquirer');

const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

String.prototype.toTitleCase = function() {
    // according to http://www.superheronation.com/2011/08/16/words-that-should-not-be-capitalized-in-titles/ & https://www.grammarcheck.net/capitalization-in-titles-101/
    const doNotCap = ['a','an','the','for','and','nor','by','or', 'yet','so', 'at', 'from', 'of', 'on', 'to', 'with', 'is', 'in', 'into','off', 'onto', 'once', 'over','as','if','than','till', 'when', 'but','like','near','past','that','up','upon']
    let words = this.valueOf().trim().toLowerCase();
    words = words.split(' ');
    const title = words.map((word, i) =>
        doNotCap.includes(word) && i ?
        word : word.charAt(0).toUpperCase() + word.substring(1)
    ); return title.join(' ');
  };

let hasManager = false;

let data = "";

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
    
    const readEmployeeTemplate = async (empType) => {

        let file = `./templates/${empType}.html`;

        const getData =  async () => {
            const response =  await fsPromises.readFile(file, 'utf-8');
            return response;
        }

        const d = await getData();

        return d;

    };

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
              console.log('you\'re done open the new "script.js"')
              return;
            }
          });
      };
    
    inquirer
        .prompt(questions)
        .then(async (answers) => {
            let employee = answers.employeeType;
            let name = answers.name;
            let email = answers.email;
            let other = answers.other;
            let template = await readEmployeeTemplate(employee);
            let newHireData = createEmployee(employee, name, email, other);

            data += 
`
let newHireDiv${newHireData.id} = document.createElement('div');

newHireDiv${newHireData.id}.id = 'employee${newHireData.id}';
newHireDiv${newHireData.id}.innerHTML = \`${template}\`;

document.querySelector('#team').appendChild(newHireDiv${newHireData.id});

let id${newHireData.id} = document.querySelector('#employee${newHireData.id} .id');
let name${newHireData.id} = document.querySelector('#employee${newHireData.id} .name');
let email${newHireData.id} = document.querySelector('#employee${newHireData.id} .email a');
email${newHireData.id}.href = 'mailto:${email}';
email${newHireData.id}.target = '_blank';
let other${newHireData.id} = document.querySelector('#employee${newHireData.id} .other');
if ('${employee}' === 'engineer') other${newHireData.id} = document.querySelector('#employee${newHireData.id} .other a');
'${employee}' === 'engineer' ? (other${newHireData.id}.href = 'https://github.com/${newHireData.github}', other${newHireData.id}.target = '_blank') : '';

id${newHireData.id}.innerText = '${newHireData.id}';
name${newHireData.id}.innerText = '${newHireData.name.toTitleCase()}';
email${newHireData.id}.innerText = '${newHireData.email}';
if (other${newHireData.id}) other${newHireData.id}.innerText = '${employee}' === 'intern' ? '${newHireData[setOtherData(employee)].toString().toTitleCase()}' : '${newHireData[setOtherData(employee)]}';
`

        enterAnotherEmployee();

        }).then(() => {
            fs.writeFile('script.js', data, (error) => {
                if (error) throw error;
            });
        })

}

writeScript();





