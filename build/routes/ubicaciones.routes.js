"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controller
const ubicaciones_controller_1 = require("./../controllers/ubicaciones.controller");
class UbicacionesRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ubicaciones_controller_1.ubicacionesController.obtenerUbicaciones);
        this.router.get('/:ubicacion', ubicaciones_controller_1.ubicacionesController.obtenerUbicacion);
        this.router.get('/:ubicacion/categorias', ubicaciones_controller_1.ubicacionesController.obtenerCategoriasPorUbicacion);
        this.router.get('/:ubicacion/categorias/:categoria', ubicaciones_controller_1.ubicacionesController.obtenerDetalleCategoriaPorUbicacion);
        this.router.get('/:ubicacion/categorias/:categoria/subcategorias', ubicaciones_controller_1.ubicacionesController.obtenerSubcategoriasPorCategorias);
        this.router.get('/:ubicacion/categorias/:categoria/subcategorias/:subcategoria', ubicaciones_controller_1.ubicacionesController.obtenerDetalleSubcategoriasPorCategorias);
    }
}
const ubicacionesRoutes = new UbicacionesRouter();
exports.default = ubicacionesRoutes.router;
