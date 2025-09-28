const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/data', express.static('data'));
app.use(express.json());

// POST: Crear nueva reserva
app.post('/reservas', (req, res) => {
    const nuevaReserva = req.body;

    // Validación básica
    if (!nuevaReserva.nombre || !nuevaReserva.apellido || !nuevaReserva.dni || !nuevaReserva.fecha || !nuevaReserva.hora || !nuevaReserva.numComensales) {
        return res.status(400).json({ error: 'Faltan datos en la reserva' });
    }

    // Leer reservas existentes
    const filePath = path.join(__dirname, 'data', 'reservas.json');
    let reservas = [];
    if (fs.existsSync(filePath)) {
        reservas = JSON.parse(fs.readFileSync(filePath));
    }

    // Comprobar si ya existe reserva con mismo DNI y fecha/hora
    const existe = reservas.some(r => r.dni === nuevaReserva.dni && r.fecha === nuevaReserva.fecha && r.hora === nuevaReserva.hora);
    if (existe) {
        return res.status(400).json({ error: 'Ya existe una reserva para este DNI en esta fecha y hora' });
    }

    // Asignar id incremental
    nuevaReserva.id = reservas.length > 0 ? reservas[reservas.length - 1].id + 1 : 1;
    reservas.push(nuevaReserva);

    fs.writeFileSync(filePath, JSON.stringify(reservas, null, 2));
    res.json({ message: 'Reserva creada correctamente' });
});

// DELETE: Anular reserva por DNI
app.delete('/reservas/:dni', (req, res) => {
    const dni = req.params.dni.trim();
    const filePath = path.join(__dirname, 'data', 'reservas.json');
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'No hay reservas' });

    let reservas = JSON.parse(fs.readFileSync(filePath));
    const reservasNuevas = reservas.filter(r => r.dni !== dni);

    if (reservas.length === reservasNuevas.length) {
        return res.status(404).json({ error: 'No se encontró reserva con ese DNI' });
    }

    fs.writeFileSync(filePath, JSON.stringify(reservasNuevas, null, 2));
    res.json({ message: 'Reserva anulada correctamente' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
