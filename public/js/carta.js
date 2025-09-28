$(document).ready(function() {
    // Pintar la carta dinámica desde el endpoint /api/carta
    $.getJSON('/api/carta', function(data) {
        let html = '<div class="menu-items">';
        data.forEach(item => {
            html += `<div class="menu-item">
                        <h3>${item.nombre}</h3>
                        <p>Precio: ${item.precio}</p>
                        ${item.imagen ? `<img src="/images/${item.imagen}" alt="${item.nombre}">` : ''}
                     </div>`;
        });
        html += '</div>';
        $('#menu').html(html);
    }).fail(function() {
        $('#menu').html('<p>Error al cargar la carta</p>');
    });
});

