const express = require('express');
const dotenv = require('dotenv').config();
const server = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3300;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

server.use(bodyParser.json());
server.get('/', (req, res) => {
    res.send('Il server backend è attivo!');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
