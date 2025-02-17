'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sar.init({
    empresaId: DataTypes.INTEGER,
    cai: DataTypes.STRING,
    rangoInicial: DataTypes.STRING,
    rangoFinal: DataTypes.STRING,
    numActualSar: DataTypes.STRING,
    fechaAutorizacion: DataTypes.DATEONLY,
    fechaVencimiento: DataTypes.DATEONLY,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Sar',
  });
  return Sar;
};