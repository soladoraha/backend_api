"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("reflect-metadata");
var config_1 = __importDefault(require("config"));
var helmet_1 = __importDefault(require("helmet"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var logger_1 = __importDefault(require("@configs/logger"));
var auth_1 = __importDefault(require("@routes/auth"));
var normal_1 = __importDefault(require("@routes/normal"));
var error_handle_1 = __importDefault(require("@middlewares/error_handle"));
var port = config_1.default.get('port');
var host = config_1.default.get('host');
var app = (0, express_1.default)();
// Set Config tuan anh edit
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Set Cross 
// const corsOptions = {
//   origin: 'http://localhost:1337',
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
// }
// app.use(cors(corsOptions))
// Router 
app.use(normal_1.default);
app.use(auth_1.default);
app.use(error_handle_1.default);
app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});
// Start server
app.listen(port, function () {
    logger_1.default.info("Server listing at http://".concat(host, ":").concat(port));
    // connect()
});
