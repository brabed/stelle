import { Router } from "express";


// Controller
import { categoriasController } from "./../controllers/categorias.controller";


class CategoriasRouter {

  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get('/:ubicacion/categorias/:categoriaId', categoriasController.obtenerCategoria);
    //this.router.get('/:ubicacion/categorias/:categoriaId/tipos', categoriasController.obtenerTiposPorCategoria);
  }
}

const categoriasRouter = new CategoriasRouter();
export default categoriasRouter.router;