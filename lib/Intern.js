Employee = require('./Employee.js')

class Intern extends Employee {

  constructor(name, email, school) {

    super(name, email);
    
    this.school = school;
    
  }

  getRole = () => 'intern';
  getSchool = () => this.school;

};

module.exports = Intern;