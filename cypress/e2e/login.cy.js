describe('SauceDemo Test Suite', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
    });
  
    it('Valid Login', () => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('Invalid Login', () => {
      cy.get('#user-name').type('invalid_user');
      cy.get('#password').type('invalid_password');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('contain', 'Username and password do not match any user in this service');
    });
  
    it('Locked Out User Login', () => {
      cy.get('#user-name').type('locked_out_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
    });
  });
  