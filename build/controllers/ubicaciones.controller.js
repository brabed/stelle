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
exports.ubicacionesController = void 0;
// Model
const Ubicacion_1 = __importDefault(require("../models/Ubicacion"));
const Categoria_1 = __importDefault(require("../models/Categoria"));
const Subcategoria_1 = __importDefault(require("../models/Subcategoria"));
class UbicacionesController {
    // Método para obtener las ubicaciones disponibles
    obtenerUbicaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ubicaciones = yield Ubicacion_1.default.findAll();
                res.status(200).json(ubicaciones);
            }
            catch (error) {
                console.error('Error al obtener ubicaciones:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
    // Método que permite traer una ubicación pasando el nombre de la ubicación como param
    obtenerUbicacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ubicacionParam = req.params.ubicacion;
                const ubicacion = yield Ubicacion_1.default.findOne({
                    where: { slug: ubicacionParam }
                });
                if (!ubicacion) {
                    return res.status(404).json({ message: 'Ubicación no encontrada mi papá!!' });
                }
                ;
                res.status(200).json(ubicacion);
            }
            catch (error) {
                console.error('Error al obtener la ubicación:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    // Método que permite obtener las categorias asociadas a la ubicación seleccionada
    obtenerCategoriasPorUbicacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ubicacionParam = req.params.ubicacion;
                const ubicacion = yield Ubicacion_1.default.findOne({
                    where: { slug: ubicacionParam },
                    include: [{ model: Categoria_1.default }]
                });
                if (!ubicacion) {
                    return res.status(404).json({ message: 'Ubicación no encontrada mi papá!!' });
                }
                ;
                const categorias = ubicacion.toJSON();
                res.status(200).json(categorias.Categoria);
            }
            catch (error) {
                console.error('Error al obtener las categorias:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    // Método que permite obtener el detalle de una categoría según la ubicación seleccionada
    obtenerDetalleCategoriaPorUbicacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ubicacionParam = req.params.ubicacion;
                const categoriaParam = req.params.categoria;
                // 1. Buscar la ubicación
                const ubicacion = yield Ubicacion_1.default.findOne({
                    where: { slug: ubicacionParam },
                    include: [{ model: Categoria_1.default }]
                });
                if (!ubicacion) {
                    return res.status(404).json({ error: 'Ubicación no encontrada' });
                }
                // 2. Buscar la categoria por su slug
                const categoria = yield Categoria_1.default.findOne({ where: { slug: categoriaParam } });
                const ubicacionJSON = ubicacion.toJSON();
                if (!categoria || !ubicacionJSON.Categoria.some((c) => c.slug === categoriaParam)) {
                    return res.status(404).json({ error: 'La categoría no pertenece a la ubicación seleccionada' });
                }
                // 3. Respuesta
                res.status(200).json(categoria);
            }
            catch (error) {
                console.error('Error al obtener el detalle de la categoria:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
    // Método para permite obtener las subcateogrias asociadas a la categoria seleccionada
    obtenerSubcategoriasPorCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ubicacionParam = req.params.ubicacion;
                const categoriaParam = req.params.categoria;
                // 1. Buscar la ubicación
                const ubicacion = yield Ubicacion_1.default.findOne({
                    where: { slug: ubicacionParam }
                });
                if (!ubicacion) {
                    return res.status(404).json({ error: 'Ubicación no encontrada' });
                }
                // 2. Buscar la categoria por su slug
                const categoria = yield Categoria_1.default.findOne({
                    where: { slug: categoriaParam },
                    include: [{ model: Subcategoria_1.default }]
                });
                if (!categoria) {
                    return res.status(404).json({ error: 'Categoría no encontrada en la ubicación proporcionada' });
                }
                const subcategoriasJSON = categoria.toJSON();
                // 3. Respuesta
                res.status(200).json(subcategoriasJSON.Subcategoria);
            }
            catch (error) {
            }
        });
    }
    // Método que permite obtener el detalle de una subcategoría según la categoria seleccionada
    obtenerDetalleSubcategoriasPorCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ubicacionParam = req.params.ubicacion;
                const categoriaParam = req.params.categoria;
                const subCategoriaParam = req.params.subcategoria;
                let categoriaIdParam = 1;
                // 0. Asignar id para validar asociación de la subcategoria con la categoria
                if (categoriaParam === 'instalaciones-y-adecuaciones') {
                    categoriaIdParam = 2;
                }
                // 1. Buscar la ubicación por slug
                const ubicacion = yield Ubicacion_1.default.findOne({
                    where: { slug: ubicacionParam }
                });
                if (!ubicacion) {
                    return res.status(404).json({ error: 'Ubicación no encontrada' });
                }
                // 2. Buscar la categoria por su slug
                const categoria = yield Categoria_1.default.findOne({
                    where: { slug: categoriaParam }
                });
                if (!categoria) {
                    return res.status(404).json({ error: 'Categoria no encontrada en la ubicación asociada' });
                }
                // 3. Buscar la subcategoria por slug
                const subcategoria = yield Subcategoria_1.default.findOne({
                    where: {
                        slug: subCategoriaParam,
                        categoriaId: categoriaIdParam
                    }
                });
                if (!subcategoria) {
                    return res.status(404).json({ error: 'Subcategoria no encontrada en la categoria asociada' });
                }
                // 4. Respuesta
                res.status(200).json(subcategoria);
            }
            catch (error) {
                console.error('Error al obtener el detalle de la subcategoria:', error);
                res.status(500).json({ mensaje: 'Error interno del servidor' });
            }
        });
    }
}
exports.ubicacionesController = new UbicacionesController();
