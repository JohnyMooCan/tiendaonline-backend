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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducto = exports.getProductos = void 0;
const producto_1 = require("../models/producto");
const { Op } = require("sequelize");
const getProductos = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { busqueda } = request.body;
    const like = {
        where: {
            nombre: {
                [Op.like]: '%' + busqueda + '%'
            }
        }
    };
    const lstProductos = yield producto_1.Producto.findAll((busqueda && busqueda != undefined) ? like : {});
    response.json(lstProductos);
});
exports.getProductos = getProductos;
const getProducto = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { busqueda } = request.body;
        //Se valida que el request sea un numero
        if (!busqueda || isNaN(+busqueda) || busqueda <= 0) {
            return response.status(400).json({
                msg: 'Parámetro no valido'
            });
        }
        const where = {
            where: {
                idProducto: busqueda
            }
        };
        const producto = yield producto_1.Producto.findOne((busqueda && busqueda != undefined) ? where : {});
        response.json(producto);
    }
    catch (error) {
        response.status(400).json({
            msg: 'Error al obtener información del producto'
        });
    }
});
exports.getProducto = getProducto;
