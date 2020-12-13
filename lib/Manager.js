Employee = require('./Employee.js')

class Manager extends Employee {

  constructor(name, email, officeNumber) {

    super(name, email);
    
    this.officeNumber = officeNumber;
    
  }

  getRole = () => 'manager';

};

module.exports = Manager;