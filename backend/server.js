require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const scheduleRoutes = require('./routes/schedules');

const app = express();
const port = process.env.PORT || 2004;

const corsOptions = {
    origin: 'http://localhost:3000', // Domínio do front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('', scheduleRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});