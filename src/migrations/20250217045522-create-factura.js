'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Facturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clienteId: {
        type: Sequelize.INTEGER
      },
      usuarioId: {
        type: Sequelize.INTEGER
      },
      fechaEmision: {
        type: Sequelize.DATE
      },
      tipoFactura: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL
      },
      metodoPago: {
        type: Sequelize.STRING
      },
      totalExtento: {
        type: Sequelize.DECIMAL
      },
      ventaId: {
        type: Sequelize.INTEGER
      },
      totalIsv: {
        type: Sequelize.DECIMAL
      },
      numFacturaSAR: {
        type: Sequelize.STRING
      },
      cai: {
        type: Sequelize.STRING
      },
      fechaVencimiento: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Facturas');
  }
};