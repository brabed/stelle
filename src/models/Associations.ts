// Connection
import sequelize from "../db/connection";

// Models
import Ubicacion from "./Ubicacion";
import Categoria from "./Categoria";
import UbicacionCategoria from "./UbicacionCategoria";
import Subcategoria from "./Subcategoria";


// Class
class Associations {

  Ubicacion: any;
  Categoria: any;
  Subcategoria: any;

  constructor() {

    this.Ubicacion = Ubicacion;
    this.Categoria = Categoria;
    this.Subcategoria = Subcategoria;

    this.definirRelaciones();
    this.sincronizarModelos();
  }

  definirRelaciones() {

    // Relacion muchos a muchos entre las ubicaciones y las categorias
    this.Ubicacion.belongsToMany(Categoria,
      {
        through: {
          model: UbicacionCategoria,
        },
        foreignKey: 'ubicacionId'
      });

    this.Categoria.belongsToMany(Ubicacion,
      {
        through: {
          model: UbicacionCategoria
        },
        foreignKey: 'categoriaId'
      });


    // Relaciones entre las subcategorias y las categorias
    this.Categoria.hasMany(this.Subcategoria, { foreignKey: 'categoriaId' });
    this.Subcategoria.belongsTo(this.Categoria, { foreignKey: 'categoriaId' });

    console.log('relaciones melas');

  }

  async sincronizarModelos() {
    try {
      await sequelize.sync({ force: false });
    } catch (error) {
    }
  }
}


export const associations = new Associations();