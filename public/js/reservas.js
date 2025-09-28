$(document).ready(function() {
    const form = $('#reservaForm');

    // Crear nueva reserva
    form.on('submit', function(e) {
        e.preventDefault();

        const nuevaReserva = {
            nombre: $('#nombre').val().trim(),
            apellido: $('#apellido').val().trim(),
            dni: $('#dni').val().trim(),
            fecha: $('#fecha').val(),
            hora: $('#hora').val(),
            numComensales: parseInt($('#numComensales').val())
        };

        // Validación de caracteres
        const regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s-]+$/;
        if (!regex.test(nuevaReserva.nombre) || !regex.test(nuevaReserva.apellido)) {
            alert('Los nombres y apellidos contienen caracteres no válidos.');
            return;
        }

        $.ajax({
            url: '/reservas',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(nuevaReserva),
            success: function(response) {
                alert(response.message);
                form.trigger('reset');
            },
            error: function(xhr) {
                alert('Error al crear la reserva: ' + (xhr.responseJSON ? xhr.responseJSON.error : xhr.responseText));
            }
        });
    });

    // Anular reserva
    $('#btnAnular').on('click', function() {
        const dni = $('#dniAnular').val().trim();
        if (!dni) return alert('Introduce un DNI válido');

        $.ajax({
            url: '/reservas/' + dni,
            type: 'DELETE',
            success: function(response) {
                alert(response.message);
                $('#dniAnular').val('');
            },
            error: function(xhr) {
                alert('Error al anular la reserva: ' + (xhr.responseJSON ? xhr.responseJSON.error : xhr.responseText));
            }
        });
    });
});


