import { DataTypes } from "sequelize";

// Connection
import sequelize from "../db/connection";

const Ubicacion = sequelize.define('Ubicacion',
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
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  { 
    tableName: 'ubicaciones',
    timestamps: true
  }
);

export default Ubicacion;