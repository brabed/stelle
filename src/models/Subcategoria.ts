import { DataTypes } from "sequelize";

// Connection
import sequelize from "../db/connection";

const Subcategoria = sequelize.define('Subcategoria',
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
    subcategoria: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    tableName: 'subcategorias',
    timestamps: true
  }
);

export default Subcategoria;
