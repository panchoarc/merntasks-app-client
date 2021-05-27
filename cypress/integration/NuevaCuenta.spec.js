/* eslint-disable no-undef */
/// <reference types ="cypress" />

describe("<NuevaCuenta />", () => {
  it("<NuevaCuenta /> - Validación y Alertas", () => {
    cy.visit("/nueva-cuenta");

    //Clickear botón de submit
    cy.get("[data-cy=submit-nueva-cuenta]").click();

    //Verificar si la alerta existe ()
    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "Todos los campos son obligatorios");

    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    //Llenado de formularios

    cy.get("[data-cy=nombre-input]").type("Francisco");

    cy.get("[data-cy=email-input]").type("francisco@gg.cl");
    cy.get("[data-cy=password-input]").type("123");
    cy.get("[data-cy=repetir-password-input]").type("123");

    //Clickear botón de submit
    cy.get("[data-cy=submit-nueva-cuenta]").click();

    //Mensaje de alerta indicando que password debe ser de al menos 6 caracteres
    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "Password debe ser de al menos 6 caracteres");

    //Verifica que la class de la alerta sea de error.
    cy.get("[data-cy=alerta]").should("have.class", "alerta-error");

    //Limpia e introduce nuevamente la password y su check-password
    cy.get("[data-cy=password-input]").clear().type("123456");
    cy.get("[data-cy=repetir-password-input]").clear().type("123458");

    //Clickear botón de submit
    cy.get("[data-cy=submit-nueva-cuenta]").click();

    //Mensaje de alerta indicando que password debe ser de al menos 6 caracteres
    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "Las contraseñas no son iguales");

    cy.get("[data-cy=password-input]").clear().type("123456");
    cy.get("[data-cy=repetir-password-input]").clear().type("123456");

    //Clickear botón de submit
    cy.get("[data-cy=submit-nueva-cuenta]").click();

    cy.visit("/proyectos");
    //Cerrar Sesión
    cy.get("[data-cy=cerrar-sesion]").click();
  });

  it("<NuevaCuenta /> - Revisar usuarios Duplicados", () => {
    cy.visit("/nueva-cuenta");

    cy.get("[data-cy=nombre-input]").type("Francisco");
    cy.get("[data-cy=email-input]").type("francisco@gg.cl");
    cy.get("[data-cy=password-input]").type("123456");
    cy.get("[data-cy=repetir-password-input]").type("123456");

    //Clickear botón de submit
    cy.get("[data-cy=submit-nueva-cuenta]").click();

    //Mensaje de alerta indicando que password debe ser de al menos 6 caracteres
    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "Ya existe este correo registrado");
  });
});
