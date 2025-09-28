$(document).ready(function() {
    // Header
    $('#header').html(`
        <div class="logo"><img src="/images/logo.png" alt="Logo del bar"></div>
        <h1>Bar El Parque</h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="carta.html">Carta</a>
            <a href="reservas.html">Reservas</a>
        </nav>
    `);

    // Footer
    $('#footer').html('<p>&copy; 2025 Bar El Parque</p>');
});
