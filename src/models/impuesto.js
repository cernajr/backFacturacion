'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Impuesto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Impuesto.init({
    facturaId: DataTypes.INTEGER,
    tipoImpId: DataTypes.INTEGER,
    baseGravable: DataTypes.DECIMAL,
    valorImpuesto: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Impuesto',
  });
  return Impuesto;
};