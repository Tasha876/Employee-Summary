Employee = require('./Employee.js')

class Engineer extends Employee {

  constructor(name, email, github) {

    super(name, email);
    
    this.github = github;
    
  }

  getRole = () => 'engineer';
  getGithub = () => this.github;

};

module.exports = Engineer;