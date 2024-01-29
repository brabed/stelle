"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.associations = void 0;
// Connection
const connection_1 = __importDefault(require("../db/connection"));
// Models
const Ubicacion_1 = __importDefault(require("./Ubicacion"));
const Categoria_1 = __importDefault(require("./Categoria"));
const UbicacionCategoria_1 = __importDefault(require("./UbicacionCategoria"));
const Subcategoria_1 = __importDefault(require("./Subcategoria"));
// Class
class Associations {
    constructor() {
        this.Ubicacion = Ubicacion_1.default;
        this.Categoria = Categoria_1.default;
        this.Subcategoria = Subcategoria_1.default;
        this.definirRelaciones();
        this.sincronizarModelos();
    }
    definirRelaciones() {
        // Relacion muchos a muchos entre las ubicaciones y las categorias
        this.Ubicacion.belongsToMany(Categoria_1.default, {
            through: {
                model: UbicacionCategoria_1.default,
            },
            foreignKey: 'ubicacionId'
        });
        this.Categoria.belongsToMany(Ubicacion_1.default, {
            through: {
                model: UbicacionCategoria_1.default
            },
            foreignKey: 'categoriaId'
        });
        // Relaciones entre las subcategorias y las categorias
        this.Categoria.hasMany(this.Subcategoria, { foreignKey: 'categoriaId' });
        this.Subcategoria.belongsTo(this.Categoria, { foreignKey: 'categoriaId' });
        console.log('relaciones melas');
    }
    sincronizarModelos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.sync({ force: false });
            }
            catch (error) {
            }
        });
    }
}
exports.associations = new Associations();
