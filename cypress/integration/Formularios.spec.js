/* eslint-disable no-undef */
/// <reference types ="cypress" />

describe("<Formularios />", () => {
  it("<Login /> - Verificar pantalla de inicio", () => {
    cy.visit("/");

    //Probar el texto
    cy.contains("Iniciar Sesión");

    cy.get("[data-cy=titulo]").invoke("text").should("equal", "Iniciar Sesión");

    //Revisar que el formulario exista
    cy.get("[data-cy=form-login]").should("exist");

    //Revisar inputs
    cy.get("[data-cy=email-input]").should("exist");
    cy.get("[data-cy=password-input]").should("exist");

    cy.get("[data-cy=submit-login]")
      .should("exist")
      .should("have.text", "Iniciar Sesión")
      .should("have.class", "btn-primario");

    cy.get("[data-cy=nueva-cuenta]")
      .should("exist")
      .should("have.prop", "tagName")
      .should("eq", "A");

    cy.get("[data-cy=nueva-cuenta]")
      .should("have.attr", "href")
      .should("eq", "/nueva-cuenta");

    cy.visit("/nueva-cuenta");
  });

  it("<Nueva Cuenta /> - Verificar componente Nueva Cuenta", () => {
    //Verifica que el título exista y que sea igual a Crea una Cuenta
    cy.get("[data-cy=titulo]")
      .should("exist")
      .invoke("text")
      .should("equal", "Crea una Cuenta");

    //Verifica que el formulario exista
    cy.get("[data-cy=nueva-cuenta]").should("exist");

    //Verifica si existen los campos
    cy.get("[data-cy=nombre-input]").should("exist");
    cy.get("[data-cy=email-input]").should("exist");

    //Verifica que los campos existen y que además son type="password"
    cy.get("[data-cy=password-input]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "password");

    cy.get("[data-cy=repetir-password-input]")
      .should("exist")
      .should("have.prop", "type")
      .should("equal", "password");

    cy.get("[data-cy=submit-nueva-cuenta]")
      .should("exist")
      .should("have.class", "btn-primario")
      .should("have.text", "Registrarse");

    cy.get("[data-cy=enlace-login]")
      .should("have.attr", "href")
      .should("eq", "/");

    cy.visit("/");
  });
});
