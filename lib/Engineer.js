Employee = require('./Employee.js')

class Engineer extends Employee {

  constructor(name, email, github) {

    super(name, email);
    
    this.github = github;

    this.getGithub = () => this.github;
    
  }

  getRole = () => 'engineer';

};

module.exports = Engineer;