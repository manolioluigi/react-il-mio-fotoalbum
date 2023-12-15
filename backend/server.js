const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const server = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3300;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = require('./router');

server.use(cors());
server.use(bodyParser.json());
server.use('/', router);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
