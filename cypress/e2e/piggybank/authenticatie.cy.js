describe("In- en uitloggen bij een gebruiker", () => {
    beforeEach('Sessie vernietigen', () => {
        cy.clearAllLocalStorage();
        cy.visit('http://localhost:3000');
    })
    it('Log in bij een gebruiker', () => {
        cy.get('.login__account')
            .eq(2)
            .click();

        cy.url()
            .should('equal', 'http://localhost:3000/');
        cy.get('h1')
            .contains('Welkom 👋')
    })

    it('Log uit bij een gebruiker', () => {
        cy.get('.login__account')
            .eq(2)
            .click();
        cy.get('.app__logout')
            .find('button')
            .click();

        cy.url()
            .should('equal', "http://localhost:3000/login")
    })
})