"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controller
const categorias_controller_1 = require("./../controllers/categorias.controller");
class CategoriasRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:ubicacion/categorias/:categoriaId', categorias_controller_1.categoriasController.obtenerCategoria);
        //this.router.get('/:ubicacion/categorias/:categoriaId/tipos', categoriasController.obtenerTiposPorCategoria);
    }
}
const categoriasRouter = new CategoriasRouter();
exports.default = categoriasRouter.router;
