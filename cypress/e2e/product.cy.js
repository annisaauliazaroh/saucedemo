describe('SauceDemo Test Suite', () => {
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
      cy.url().should('include', '/inventory.html');
    });
  
    it('Product Listing', () => {
      cy.get('.inventory_item').should('have.length', 6);
    });
  
    it('Product Sorting', () => {
       cy.get('.product_sort_container').select('Price (low to high)');
       cy.get('.inventory_item_price').then(prices => {
        const priceValues = [...prices].map(price => parseFloat(price.innerText.replace('$', '')));
        expect(priceValues).to.deep.equal(priceValues.sort((a, b) => a - b));
        });
    });
      
    it('Adding Products to Cart', () => {
       cy.get('#add-to-cart-sauce-labs-onesie').click();
       cy.get('.shopping_cart_badge').should('contain', '1');
    });
    
    it('Viewing the Shopping Cart', () => {
        cy.get('.shopping_cart_link').click();
        cy.get('.cart_item').should('have.length', 1);
      });
    
    it('Removing Products from Cart', () => {
        cy.get('.cart_item').should('have.length', 1);
        cy.get('.cart_button').click();
        cy.get('.cart_item').should('have.length', 0);
      });
    
    it('Proceeding to Checkout', () => {
        cy.get('.continue-shopping').click();
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_link').click();
        cy.get('.checkout_button').click();
        cy.url().should('include', '/checkout-step-one.html');
      });
    
    it('Information Input', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_link').click();
        cy.get('.checkout_button').click();
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('.cart_button').click();
        cy.url().should('include', '/checkout-step-two.html');
      });
    
    it('Overview and Completion', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').click();
        cy.get('.shopping_cart_link').click();
        cy.get('.checkout_button').click();
        cy.get('[data-test="firstName"]').type('John');
        cy.get('[data-test="lastName"]').type('Doe');
        cy.get('[data-test="postalCode"]').type('12345');
        cy.get('.cart_button').click();
        cy.get('.cart_button').click();
        cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER');
      });
  });
  