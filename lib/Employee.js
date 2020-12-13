let curr_id = 0;

let Employee = class {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.id = ++curr_id;
  }

  getName = () => this.name;
  getEmail = () => this.email;
  getId = () => this.id;
  getRole = () => 'employee';

};

module.exports = Employee;