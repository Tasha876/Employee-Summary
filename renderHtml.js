const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "./templates");

// just transforms a string to title case
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

// actually renders the employee info and returns the modified template
const getEmployeeOfType = (employeeTypes, employees) => {
    let template = "";
    // filters the list of employees for each type then calls function
    // to render that type of employee on page
    employeeTypes.forEach(type => {
        let filtered = employees.filter(employee => employee.getRole() === type.toLowerCase())
        let mapped = filtered.map(employee => render(employee, type))
        template += mapped.join('\n');
    }); return template;
}

// this reads the appropriate template file according to the tye of employee and calls replacePlaceholders
// to replace all the placeholders for that specific employee type i.e. role
const render = (employee, empType) => {
    let template = fs.readFileSync(path.resolve(templatesDir,`${empType}.html`),'utf8')
    template = replacePlaceholders(template, employee)
    return template;
}

// this is the patter, we're looking for
const getPattern = (value) => new RegExp("{{ " + value + " }}", "gm");


// finds where the pattern occurs and replaced it with the specified actual value

const replacePlaceholders = (template, employee) => {

    // the value of other depends of the employee role
    // finds the value of other based on employee role
    const getOther = () => {
        let value;
        switch (employee.getRole()) {
            case 'intern':
                value = employee.getSchool().toTitleCase();
                break;
            case 'engineer':
                value = employee.getGithub();
                break;
            case 'manager':
                value = employee.getOfficeNumber();
                break;
        } return value;
    }

    let value;
    
    // the below actually replace all the values

    value = 'id';
    template = template.replace(getPattern('id'), employee.getId()) 

    value = 'name';
    template = template.replace(getPattern('name'), employee.getName().toTitleCase()) 

    value = 'email';
    template = template.replace(getPattern('email'), employee.getEmail()) 

    value = 'other';
    template = template.replace(getPattern('other'), getOther()) 

    return template
};

module.exports = {
    getEmployeeOfType,
    getPattern,
}
  
