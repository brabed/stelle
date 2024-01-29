import { DataTypes } from "sequelize";

// Connection
import sequelize from "../db/connection";

const Categoria = sequelize.define('Categoria',
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
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    tableName: 'categorias',
    timestamps: true
  }
);

export default Categoria; 