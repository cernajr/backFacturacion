'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inventario.init({
    productoId: DataTypes.INTEGER,
    empresaId: DataTypes.INTEGER,
    stockActual: DataTypes.DECIMAL,
    stockMinimo: DataTypes.DECIMAL,
    stockMaximo: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Inventario',
  });
  return Inventario;
};