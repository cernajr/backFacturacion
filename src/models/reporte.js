'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reporte.init({
    tipoReporte: DataTypes.STRING,
    fechaInicio: DataTypes.DATE,
    fechaFin: DataTypes.DATE,
    filtros: DataTypes.JSON,
    formato: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    ruta: DataTypes.STRING,
    nombreArchivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reporte',
  });
  return Reporte;
};