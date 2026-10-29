describe('Gegevens inzien en bewerken van je account', () => {
    beforeEach('Inloggen als Melvin', () => {
        cy.clearAllLocalStorage();
        cy.visit('http://localhost:3000');
        cy.get('.login__account')
            .eq(0)
            .click();
    })

    it('Naam veranderen van je rekening', () => {
        const accountName = 'Rekening van Pim';

        cy.visit('http://localhost:3000/settings');
        cy.get('#accountName')
            .type(`{selectall}{backspace}${accountName}`);
        cy.get('.form-row button')
            .eq(0)
            .click();

        cy.visit('http://localhost:3000');
        cy.get(".accounts__account-name")
            .should('have.text', accountName);
    });

    it('Transactiegeschiedenis inzien', () => {
        cy.visit('http://localhost:3000/transactions');
        cy.get('.container').eq(0)
            .find('div')
            .should('have.length.at.least', 4);
    });

    it('Saldo inzien', () => {
        cy.visit('http://localhost:3000');
        cy.get('.accounts__account-balance')
            .invoke('text')
            .then((text) => {
                const lines = text.split(' ');
                const balance = parseFloat(lines[1]);

                expect(balance).to.not.be.NaN;
                return balance
            })
            .should('be.a', 'number');
    });
});