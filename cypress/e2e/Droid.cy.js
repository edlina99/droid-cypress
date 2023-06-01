describe('First Test', () => {
    it('verify title-droids', () => {
      //test steps

      //login to microsoft
      function loginViaAAD(username, password) {
        cy.visit("https://devdroid.petronas.com")
        
        //login to AAD tenant
        cy.origin(
          'login.microsoftonline.com',
          {
            args: {
              username,
            },
          },
          ({username}) => {
            cy.get('input[type="email"]').type(username, {
              log: false,
            })
            cy.get('input[type="submit"]').click()
          }
        )

        //enter password
        cy.origin(
          'https://login.microsoftonline.com/8b24551d-7c2c-4beb-8b61-95f32d9929ef',
          {
            args: {
              password,
            },
          },
          ({password}) => {
            cy.get('input[type="password"]').type(password, {
              log: false,
            })
            cy.get('input[type="submit"]').click()
          }
        )

        //ensure microsoft redirect back to droid website
        // cy.url().should('eq', 'https://devdroid.petronas.com/#/home')
        cy.title().should('eq', 'DROID')
      }

      Cypress.Commands.add('loginToAAD', (username, password) => {
        const log = Cypress.log ({
          displayName: 'Azure Active Directory Login',
          message: [`🔐 Authenticating | ${username}`],
          autoEnd: false,
        })

        log.snapshot('before')

        loginViaAAD(username, password)

        log.snapshot('after')
        log.end()
      })
    })
})

describe('Azure Active Directory Authentication', () => {
  
  beforeEach(() => {
    //log into azure active directory through sample SPA using custom command
    cy.loginToAAD(Cypress.env('aad_username'), Cypress.env('aad_password'))
    cy.visit('https://devdroid.petronas.com')
  });

    it('verifies the user logging in has the correct title', () => {
      cy.title().should('eq', 'DROID')
    });

    it('go to data wellbore equipment report page', () => {
      cy.get('.hamburger-box').click()
      cy.get('a[title="Data Management"]').click()
      cy.get('a[title="Wellbore Equipment Report"]').click({multiple:true})
      cy.get('.hamburger-box').click()
      cy.get('a[href="#/data-management/wer/editor"]').click()
      cy.get('ng-select[placeholder="Select Region"]').click()

      //click 'Peninsular Malaysia'
      cy.get('ng-select[placeholder="Select Region"]').then((dropdown) => {
        cy.wrap(dropdown).click();
        cy.get('#aa146198c6a4-1')
          .contains('Peninsular Malaysia')
          .then((item) => {
            cy.wrap(item).click();
          });
      })
    })
});
