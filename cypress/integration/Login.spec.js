/* eslint-disable no-undef */
/// <reference types ="cypress" />

describe("<Login />", () => {
  it("<Login /> - Validación, Alertas y Autenticación", () => {
    cy.visit("/");

    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "Todos los campos son obligatorios");

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    //Probar con un usuario que no existe
    cy.get("[data-cy=email-input]").type("email@email.com");
    cy.get("[data-cy=password-input]").type("123456");

    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "El usuario no existe");

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    //Probar con un usuario que no existe
    cy.get("[data-cy=email-input]").clear().type("francisco@gg.cl");
    cy.get("[data-cy=password-input]").clear().type("1234563");

    cy.get("[data-cy=submit-login]").click();

    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "El usuario no existe");

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    //Autenticar usuario
    cy.get("[data-cy=email-input]").clear().type("francisco@gg.cl");
    cy.get("[data-cy=password-input]").clear().type("123456");

    cy.get("[data-cy=submit-login]").click();

    //Desde el dashboard

    cy.get("[data-cy=cerrar-sesion]").click();
  });
});
