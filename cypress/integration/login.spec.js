import routes from "../../constants/routes"
describe('Login', () => {
    it('Should Login', () => {
        // Go to login page
        cy.visit(routes.LOGIN)

        // Enter Email
        cy.get('input[id="email"]').type("soufianxlm@gmail.com")

        // Enter Password
        cy.get('input[id="password"]').type("soufiane")

        cy.get('button[type="submit"]').click()


        // cy.getCookie('jwt_token').should('exist')

        // The new url should include "/about"
        // cy.url().should('include', '/home')

        // The new page should contain an h1 with "About page"
        //   cy.get('h1').contains('About Page')
    })
})
