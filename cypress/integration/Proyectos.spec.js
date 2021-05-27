/* eslint-disable no-undef */
/// <reference types ="cypress" />

describe("Administrador", () => {
  it("<Login /> - Autenticación", () => {
    cy.visit("/");

    //Llenar el formulario
    cy.get("[data-cy=email-input]").type("francisco@gg.cl");
    cy.get("[data-cy=password-input]").type("123456");

    cy.get("[data-cy=submit-login]").click();
  });

  it("<Proyectos /> - Validar Proyectos", () => {
    //Validación
    cy.get("[data-cy=boton-nuevo-proyecto]").click();
    cy.get("[data-cy=submit-nuevo-proyecto]").click();

    //Mostrar alerta
    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "El nombre del Proyecto es Obligatorio");

    //Verificar className
    cy.get("[data-cy=alerta]").should("have.class", "mensaje error");
  });

  it("<Proyectos /> - Creación de Proyectos", () => {
    cy.get("[data-cy=input-nuevo-proyecto]").type("Tienda Virtual");

    cy.get("[data-cy=submit-nuevo-proyecto]").click();

    //Seleccionar el Proyecto

    cy.get("[data-cy=listado-proyectos] li:nth-child(1) button").click();
  });

  it("<Tareas /> - Validación y Creación de Tareas", () => {
    //Validación de tarea
    cy.get("[data-cy=submit-tarea]").click();

    //Mostrar alerta
    cy.get("[data-cy=alerta]")
      .should("exist")
      .invoke("text")
      .should("equal", "Nombre de la tarea es obligatorio");

    //Verificar className
    cy.get("[data-cy=alerta]").should("have.class", "mensaje error");

    //Creación de tarea

    cy.get("[data-cy=input-tarea]").type("Definir diseño");

    cy.get("[data-cy=submit-tarea]").click();

    cy.get("[data-cy=input-tarea]").type("Definir Tipografia");

    cy.get("[data-cy=submit-tarea]").click();

    cy.get("[data-cy=input-tarea]").type("Definir Colores");

    cy.get("[data-cy=submit-tarea]").click();
  });

  it("<Tareas /> - Completar, Descompletar, Editar y Eliminar", () => {
    //Selecciona la primer Tarea y la marca como completa
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=tarea-incompleta]").click();

    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=tarea-completa]").should(
      "have.class",
      "completo"
    );
    //Selecciona la primer Tarea y la marca como incompleta

    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=tarea-completa]").click();

    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=tarea-incompleta]").should(
      "have.class",
      "incompleto"
    );

    //Editar tareas
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=btn-editar]").click();

    cy.get("[data-cy=input-tarea]")
      .clear()
      .type("Definir Diseño de base de datos");

    cy.get("[data-cy=submit-tarea]").click();

    //Eliminar tareas
    cy.get("[data-cy=tarea]:nth-child(1) [data-cy=btn-eliminar]").click();
    cy.get("[data-cy=tarea]:nth-child(1)")
      .invoke("text")
      .should("not.equal", "Definir Diseño de base de datos");
  });
});
