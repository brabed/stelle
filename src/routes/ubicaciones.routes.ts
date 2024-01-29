import { Router } from "express";


// Controller
import { ubicacionesController } from "./../controllers/ubicaciones.controller";


class UbicacionesRouter {

  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/', ubicacionesController.obtenerUbicaciones);
    this.router.get('/:ubicacion', ubicacionesController.obtenerUbicacion);
    this.router.get('/:ubicacion/categorias', ubicacionesController.obtenerCategoriasPorUbicacion);
    this.router.get('/:ubicacion/categorias/:categoria', ubicacionesController.obtenerDetalleCategoriaPorUbicacion);
    this.router.get('/:ubicacion/categorias/:categoria/subcategorias', ubicacionesController.obtenerSubcategoriasPorCategorias);
    this.router.get('/:ubicacion/categorias/:categoria/subcategorias/:subcategoria', ubicacionesController.obtenerDetalleSubcategoriasPorCategorias);
  }
}

const ubicacionesRoutes = new UbicacionesRouter();
export default ubicacionesRoutes.router;