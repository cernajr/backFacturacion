'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Factura.init({
    clienteId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    fechaEmision: DataTypes.DATE,
    tipoFactura: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    metodoPago: DataTypes.STRING,
    totalExtento: DataTypes.DECIMAL,
    ventaId: DataTypes.INTEGER,
    totalIsv: DataTypes.DECIMAL,
    numFacturaSAR: DataTypes.STRING,
    cai: DataTypes.STRING,
    fechaVencimiento: DataTypes.DATE,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Factura',
  });
  return Factura;
};