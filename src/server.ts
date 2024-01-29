import express, { Application, Router } from "express";

// Routes
import ubicacionesRoutes from "./routes/ubicaciones.routes";
//import categoriasRoutes from "../routes/categorias.routes";

// Middlewares
import NotFoundMiddleware from "./middlewares/notFound.middleware";


// Sincronizacidor
import { associations } from "./models/Associations";

class Server {

  private app: Application;
  private router: Router;
  private port: string;

  constructor() {
    this.app = express();
    this.router = express.Router();
    this.port = process.env.PORT || '3001';

    this.routes();
    this.dbConnect();
    this.listen();
  }

  routes(): void {

    // Prefijo 
    this.app.use('/api/v1', this.router);
    this.router.use('/ubicaciones', ubicacionesRoutes);
    this.router.use(NotFoundMiddleware.handle.bind(NotFoundMiddleware));
  }

  async dbConnect() {
    try {
      await associations.sincronizarModelos();
      console.log('Modelos sincronizados correctamente');

    } catch (error) {
      console.log("🚀  Server  dbConnect  error:", error)
    }
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log('Aplicación corriendo en el puerto: ' + this.port);
    });
  }
}

export default Server;