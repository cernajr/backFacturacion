'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pago.init({
    facturaId: DataTypes.INTEGER,
    montoPago: DataTypes.DECIMAL,
    referenciaPago: DataTypes.STRING,
    fechaPago: DataTypes.DATE,
    metodoPago: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pago',
  });
  return Pago;
};