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
exports.categoriasController = void 0;
// Model
const Categoria_1 = __importDefault(require("../models/Categoria"));
const Subcategoria_1 = __importDefault(require("../models/Subcategoria"));
class CategoriasController {
    obtenerCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoriaParam = req.params.categoriaId;
            try {
                const categoria = yield Categoria_1.default.findOne({
                    where: { id: categoriaParam }
                });
                if (!categoria) {
                    return res.status(404).json({ message: 'Categoria no encontrada mi papá!!' });
                }
                ;
                res.json(categoria);
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    obtenerTiposPorCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoriaParam = req.params.categoriaId;
            try {
                const categoria = yield Categoria_1.default.findOne({
                    where: { id: categoriaParam },
                    include: [{ model: Subcategoria_1.default }]
                });
                if (!categoria) {
                    return res.status(404).json({ message: 'Ubicación no encontrada mi papá!!' });
                }
                ;
                const categorias = categoria.toJSON();
                res.json(categorias.Tipos);
            }
            catch (error) {
            }
        });
    }
}
exports.categoriasController = new CategoriasController();
