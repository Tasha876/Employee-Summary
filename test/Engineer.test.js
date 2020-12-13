Engineer = require('../lib/Engineer.js');

describe('Engineer', () => {

    it('Creates a new Employee', () => {
      const ted = new Engineer('ted','ted@fakemail.com','teddybear')
      expect(ted instanceof Employee).toEqual(true)
    });

    it('Creates a new Engineer', () => {
      const ted = new Engineer('ted','ted@fakemail.com', 'teddybear')
      expect(ted instanceof Engineer).toEqual(true)
    });

    it('Sets the name', () => {
      const ted = new Engineer('ted','ted@fakemail.com','teddybear');
      expect(ted.name).toEqual('ted');
    });

    it('Sets the email', () => {
      const ted = new Engineer('ted','ted@fakemail.com','teddybear');
      expect(ted.email).toEqual('ted@fakemail.com');
    });

    it('Sets the GitHub', () => {
      const ted = new Engineer('ted','ted@fakemail.com','teddybear');
      expect(ted.github).toEqual('teddybear');
    });

    describe('the function getName', () => {
      it('gets the employees name', () => {
        const ted = new Engineer('ted','ted@fakemail.com','teddybear');
        expect(ted.getName()).toEqual('ted');
       });
    });

    describe('the function getEmail', () => {
      it('gets the employees email', () => {
        const ted = new Engineer('ted','ted@fakemail.com','teddybear');
        expect(ted.getEmail()).toEqual('ted@fakemail.com');
       });
    });

    describe('the function getGithub', () => {
      it('gets the engineers GitHub', () => {
        const ted = new Engineer('ted','ted@fakemail.com','teddybear');
        expect(ted.getGithub()).toEqual('teddybear');
       });
    });

});