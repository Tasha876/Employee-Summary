Manager = require('../lib/Manager.js');

describe('Manager', () => {

    it('Creates a new Employee', () => {
      const ted = new Manager('ted','ted@fakemail.com',1)
      expect(ted instanceof Employee).toEqual(true)
    });

    it('Creates a new Manager', () => {
      const ted = new Manager('ted','ted@fakemail.com',1)
      expect(ted instanceof Manager).toEqual(true)
    });

    it('Sets the name', () => {
      const ted = new Manager('ted','ted@fakemail.com',1);
      expect(ted.name).toEqual('ted');
    });

    it('Sets the email', () => {
      const ted = new Manager('ted','ted@fakemail.com',1);
      expect(ted.email).toEqual('ted@fakemail.com');
    }); 

    it('Sets the office number', () => {
      const ted = new Manager('ted','ted@fakemail.com',1);
      expect(ted.officeNumber).toEqual(1);
    });   

    describe('the function getName', () => {
      it('gets the employees name', () => {
        const ted = new Manager('ted','ted@fakemail.com');
        expect(ted.getName()).toEqual('ted');
       });
    });

    describe('the function getEmail', () => {
      it('gets the employees email', () => {
        const ted = new Manager('ted','ted@fakemail.com');
        expect(ted.getEmail()).toEqual('ted@fakemail.com');
       });
    });

});
