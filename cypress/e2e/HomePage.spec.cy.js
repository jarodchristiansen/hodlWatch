// data-cy={`pagination-page-${number}`}
describe("Nav Menus", () => {
  // For desktop view
  context("720p resolution", () => {
    beforeEach(() => {
      /**
       * Run these tests as if in a desktop browser,
       * with a 720p monitor
       */
      cy.viewport(1280, 720);
    });
    describe("When you visit home", () => {
      it("Should visit home page", () => {
        cy.visit("/");
      });

      describe("nav", () => {
        it("Should allow you travel to auth page if not signed in", () => {
          cy.get("[data-cy=nav-item]").contains("Sign in").click();
          // cy.get("[data-cy=nav-item]").contains("Assets").click();
          cy.url().should("include", "/auth");
        });
      });
      // describe("nav", () => {
      //   it("Should navigate to Auth page", () => {
      //     cy.get("[data-cy=nav-item]").contains("Sign In").click();
      //     cy.url().should("include", "/auth");
      //   });
      // });
    });
  });
  // context("iphone-5 resolution", () => {
  //   beforeEach(() => {
  //     /**
  //      * Run these tests as if in a desktop browser,
  //      * with a 720p monitor
  //      */
  //     cy.viewport("iphone-5");
  //   });
  //   describe("When you visit home", () => {
  //     it("Should visit home page", () => {
  //       cy.visit("/");
  //     });
  //     describe("Mmenu", () => {
  //       it("Should open the mmenu", () => {
  //         cy.get("[data-cy=mmenu-btn]").click();
  //       });
  //       describe("nav", () => {
  //         it("Should navigate to About page", () => {
  //           cy.get("[data-cy=nav-item]").contains("About").click();
  //           cy.url().should("include", "/about/");
  //         });
  //       });
  //     });
  //   });
  // });

  describe("Login page", () => {
    before(() => {
      // cy.log(`Visiting https://company.tld`);
      cy.visit("/auth");
    });
    it("Login with Github", () => {
      const username = Cypress.env("GITHUB_ID");
      const password = Cypress.env("GITHUB_SECRET");
      const loginUrl = Cypress.env("SITE_NAME");
      const cookieName = Cypress.env("COOKIE_NAME");
      const socialLoginOptions = {
        username,
        password,
        loginUrl,
        headless: true,
        logs: false,
        isPopup: true,
        loginSelector: `a[href="${Cypress.env(
          "SITE_NAME"
        )}/api/auth/signin/github"]`,
        postLoginSelector: ".unread-count",
      };

      return cy
        .task("GithubSocialLogin", socialLoginOptions)
        .then(({ cookies }) => {
          cy.clearCookies();

          const cookie = cookies
            .filter((cookie) => cookie.name === cookieName)
            .pop();
          if (cookie) {
            cy.setCookie(cookie.name, cookie.value, {
              domain: cookie.domain,
              expiry: cookie.expires,
              httpOnly: cookie.httpOnly,
              path: cookie.path,
              secure: cookie.secure,
            });

            Cypress.Cookies.defaults({
              preserve: cookieName,
            });

            // remove the two lines below if you need to stay logged in
            // for your remaining tests
            // cy.visit("/api/auth/signout");
            // cy.get("form").submit();
          }
        });
    });
  });
});
