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
  describe('Auth', function () {
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
  describe('Home page', function () {
    it('search for movies', function () {
      cy.get('input[placeholder="search"]').type('event horizon');
      cy.contains('li', 'Event Horizon').click();
      cy.contains('h1', 'Event Horizon');
    });
    it('show message if no matches', function () {
      cy.get('input[placeholder="search"]').type('123qwe123');
      cy.contains('No matches found :(');
    });
    it('filters movies by genre', function () {
      cy.intercept('GET', '/api/tmdb/genre?genreId=35&page=1').as('genre');
      cy.get('span').contains('Comedy').click();
      cy.wait('@genre').then(interception =>
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      );
    });
    it('can use pagination', function () {
      cy.intercept('GET', '/api/tmdb/popular?page=2').as('pagination');
      cy.get('[data-test="next-page"').click();
      cy.get('span').contains('Comedy').click();
      cy.wait('@pagination').then(interception =>
        expect(interception.response.statusCode).to.be.oneOf([200, 304])
      );
    });

    it('addition of movies', function () {
      //if user not logged in
      cy.intercept('POST', '/api/movies').as('add-movie');
      cy.get('button').contains('+').click();
      cy.wait('@add-movie').then(interception =>
        expect(interception.response.statusCode).to.equal(401)
      );
      cy.contains('Log in to add a movie');
      // after log in
      cy.contains('log in').click();
      cy.get('input[placeholder="email*"]').type('user@email.com');
      cy.get('input[placeholder="password*"]').type('123456');
      cy.get('#submit-credentials').click();
      cy.get('button').contains('+').click();
      cy.wait('@add-movie').then(interception =>
        expect(interception.response.statusCode).to.equal(201)
      );
      cy.contains(/added to list/i);
      cy.contains(/my movies 1/i);
    });
  });
});
