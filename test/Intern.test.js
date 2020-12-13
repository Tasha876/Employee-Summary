Intern = require('../lib/Intern.js');

describe('Intern', () => {

    it('Creates a new Employee', () => {
      const ted = new Intern('ted','ted@fakemail.com','Fake-iversity')
      expect(ted instanceof Employee).toEqual(true)
    });

    it('Creates a new Intern', () => {
      const ted = new Intern('ted','ted@fakemail.com','Fake-iversity')
      expect(ted instanceof Intern).toEqual(true)
    });

    it('Sets the name', () => {
      const ted = new Intern('ted','ted@fakemail.com','Fake-iversity');
      expect(ted.name).toEqual('ted');
    });

    it('Sets the email', () => {
      const ted = new Intern('ted','ted@fakemail.com','Fake-iversity');
      expect(ted.email).toEqual('ted@fakemail.com');
    });  

    it('Sets the school', () => {
      const ted = new Intern('ted','ted@fakemail.com','Fake-iversity');
      expect(ted.school).toEqual('Fake-iversity');
    });  

    describe('the function getName', () => {
      it('gets the employees name', () => {
        const ted = new Intern('ted','ted@fakemail.com','Fake-iversity');
        expect(ted.getName()).toEqual('ted');
       });
    });

    describe('the function getEmail', () => {
      it('gets the employees email', () => {
        const ted = new Intern('ted','ted@fakemail.com','Fake-iversity');
        expect(ted.getEmail()).toEqual('ted@fakemail.com');
       });
    });

    describe('the function getSchool', () => {
      it('gets the interns school', () => {
        const ted = new Intern('ted','ted@fakemail.com','Fake-iversity');
        expect(ted.getSchool()).toEqual('Fake-iversity');
       });
    });

});