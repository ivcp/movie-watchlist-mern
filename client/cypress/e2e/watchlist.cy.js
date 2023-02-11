describe('Watchlist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      firstName: 'user',
      lastName: 'existing',
      email: 'user@email.com',
      password: '123456',
    });

    cy.visit('http://localhost:5173/');
  });
  it('can open front page', function () {
    cy.contains('home');
    cy.contains('log in');
  });
  describe('auth', function () {
    beforeEach(function () {
      cy.contains('log in').click();
      //prettier-ignore
      cy.contains('don\'t have an account? register').click();
      cy.get('input[placeholder="first name*"]').as('firstName');
      cy.get('input[placeholder="last name"]').as('lastName');
      cy.get('input[placeholder="email*"]').as('email');
      cy.get('input[placeholder="password*"]').as('password');
    });

    it('can register user', function () {
      cy.get('@firstName').type('tester');
      cy.get('@lastName').type('testing');
      cy.get('@email').type('test@email.com');
      cy.get('@password').type('123456');
      cy.get('@password').should('have.attr', 'type', 'password');
      cy.contains('show password').click();
      cy.get('@password').should('have.attr', 'type', 'text');
      cy.contains('register and log in').click();
      cy.contains('tester testing registered successfully');
      cy.contains('my movies 0');
    });
    it('does not register user if email taken, password too short, name too long', function () {
      //if existing email
      cy.get('@firstName').type('user');
      cy.get('@lastName').type('testing');
      cy.get('@email').type('user@email.com');
      cy.get('@password').type('123456');
      cy.contains('register and log in').click();
      cy.contains('user@email.com already taken');
      //if short password
      cy.get('@email').clear().type('new@email.com');
      cy.get('@password').clear().type('123');
      cy.contains('register and log in').click();
      cy.contains('password must be at least 6 characters long');
      //if long name
      cy.get('@password').type('123456');
      cy.get('@firstName').clear().type('reallylongname');
      cy.contains('register and log in').click();
      cy.contains('name cannot be more than 12 characters long');
    });

    it('can log in user', function () {
      cy.contains('already have an account? log in').click();
      cy.get('@email').type('user@email.com');
      cy.get('@password').type('123456');
      cy.get('#submit-credentials').click();
      cy.contains('user existing logged in successfully');
    });
    it('fails to log in if wrong credentials', function () {
      cy.contains('already have an account? log in').click();
      // wrong email
      cy.get('@email').type('new@email.com');
      cy.get('@password').type('123456');
      cy.get('#submit-credentials').click();
      cy.contains('user with email new@email.com does not exist');
      // wrong password
      cy.get('@email').clear().type('user@email.com');
      cy.get('@password').clear().type('1234567');
      cy.get('#submit-credentials').click();
      cy.contains('invalid password');
    });
  });
});
