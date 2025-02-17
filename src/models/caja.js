'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Caja.init({
    empresaId: DataTypes.INTEGER,
    usuarioId: DataTypes.INTEGER,
    fechaApertura: DataTypes.DATE,
    fechaCierre: DataTypes.DATE,
    saldoInicial: DataTypes.DECIMAL,
    saldoFinal: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Caja',
  });
  return Caja;
};