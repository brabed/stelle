import { DataTypes } from "sequelize";

// Connection
import sequelize from "../db/connection";

const UbicacionCategoria = sequelize.define('UbicacionCategoria', 
  {
    ubicacionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'ubicacionesCategorias',
    timestamps: true
  });

export default UbicacionCategoria;