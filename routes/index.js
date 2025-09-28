const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/carta', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/carta.html'));
});

router.get('/reserva', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/reserva.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

module.exports = router;
