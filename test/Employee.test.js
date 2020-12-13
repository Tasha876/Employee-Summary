Employee = require('../lib/Employee.js');
Engineer = require('../lib/Engineer.js');
Intern = require('../lib/Intern.js');
Manager = require('../lib/Manager.js');

describe('Employee', () => {

    it('Creates a new Employee', () => {
      const ted = new Employee('ted','ted@fakemail.com');
      expect(ted instanceof Employee).toEqual(true);
    });

    it('Sets the name', () => {
      const ted = new Employee('ted','ted@fakemail.com');
      expect(ted.name).toEqual('ted');
    });

    it('Sets the email', () => {
      const ted = new Employee('ted','ted@fakemail.com');
      expect(ted.email).toEqual('ted@fakemail.com');
    });

    it('Sets the ID', () => {
      const ted = new Employee('ted','ted@fakemail.com');
      expect(ted.id).toEqual(4);
    });

    it('Increments the ID', () => {
      const ted = new Employee('ted','ted@fakemail.com');
      const sarah = new Employee('sarah','sarah@fakemail.com');
      expect(ted.id).toEqual(5);
      expect(sarah.id).toEqual(6);
    });

    it('Increments the ID no matter the type', () => {
      const ted = new Manager('ted','ted@fakemail.com');
      const sarah = new Intern('sarah','sarah@fakemail.com');
      const alyssa = new Engineer('alyssa','alyssa@fakemail.com');
      const tom = new Engineer('tom','tom@fakemail.com');
      expect(ted.id).toEqual(7);
      expect(sarah.id).toEqual(8);
      expect(alyssa.id).toEqual(9);
      expect(tom.id).toEqual(10);
    });

    describe('the function getName', () => {
      it('gets the employees name', () => {
        const ted = new Employee('ted','ted@fakemail.com');
        expect(ted.getName()).toEqual('ted');
       });
    });

    describe('the function getEmail', () => {
      it('gets the employees email', () => {
        const ted = new Employee('ted','ted@fakemail.com');
        expect(ted.getEmail()).toEqual('ted@fakemail.com');
       });
    });

});

