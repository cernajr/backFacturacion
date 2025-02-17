'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      empresaId: {
        type: Sequelize.INTEGER
      },
      cai: {
        type: Sequelize.STRING
      },
      rangoInicial: {
        type: Sequelize.STRING
      },
      rangoFinal: {
        type: Sequelize.STRING
      },
      numActualSar: {
        type: Sequelize.STRING
      },
      fechaAutorizacion: {
        type: Sequelize.DATEONLY
      },
      fechaVencimiento: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('Sars');
  }
};