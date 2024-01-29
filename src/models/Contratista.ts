import { DataTypes } from "sequelize";

// Connection
import sequelize from "../db/connection";

const Contratista = sequelize.define('Contratista',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celular: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: 'contratistas',
    timestamps: true
  }
);

export default Contratista;