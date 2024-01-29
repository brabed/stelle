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
const express_1 = __importDefault(require("express"));
// Routes
const ubicaciones_routes_1 = __importDefault(require("./routes/ubicaciones.routes"));
//import categoriasRoutes from "../routes/categorias.routes";
// Middlewares
const notFound_middleware_1 = __importDefault(require("./middlewares/notFound.middleware"));
// Sincronizacidor
const Associations_1 = require("./models/Associations");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.router = express_1.default.Router();
        this.port = process.env.PORT || '3001';
        this.routes();
        this.dbConnect();
        this.listen();
    }
    routes() {
        // Prefijo 
        this.app.use('/api/v1', this.router);
        this.router.use('/ubicaciones', ubicaciones_routes_1.default);
        this.router.use(notFound_middleware_1.default.handle.bind(notFound_middleware_1.default));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Associations_1.associations.sincronizarModelos();
                console.log('Modelos sincronizados correctamente');
            }
            catch (error) {
                console.log("🚀  Server  dbConnect  error:", error);
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto: ' + this.port);
        });
    }
}
exports.default = Server;
