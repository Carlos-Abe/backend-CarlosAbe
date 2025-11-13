const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const router = express.Router();

// Lê o arquivo swagger.yaml e converte pra JSON
const file = fs.readFileSync('swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// Configura o Swagger UI na rota /
router.use('/', swaggerUI.serve);
router.get('/', swaggerUI.setup(swaggerDocument));

// Exporta o roteador
module.exports = router;
