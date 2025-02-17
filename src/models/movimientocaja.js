'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movimientoCaja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  movimientoCaja.init({
    cajaId: DataTypes.INTEGER,
    facturaId: DataTypes.INTEGER,
    tipoMovimiento: DataTypes.STRING,
    monto: DataTypes.DECIMAL,
    descripcion: DataTypes.STRING,
    fechaMovimiento: DataTypes.DATE,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'movimientoCaja',
  });
  return movimientoCaja;
};