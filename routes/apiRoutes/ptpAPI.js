const express = require('express');
const ptpController = require('../../controllers/tipoProductoProductoController');

let router = express.Router();

router.get('/', ptpController.getAllProductosConTipos);

module.exports = router;
