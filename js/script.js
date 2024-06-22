document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn1');
    const tabla = document.getElementById('tabla');
    const totalElement = document.getElementById('total');
    const cantidadSpan = document.getElementById('cantidad');
    const incrementoBtn = document.getElementById('incremento');
    const decrementoBtn = document.getElementById('decremento');
    let total = 0;

    incrementoBtn.addEventListener('click', function () {
        let cantidad = parseInt(cantidadSpan.textContent);
        cantidad++;
        cantidadSpan.textContent = cantidad;
    });

    decrementoBtn.addEventListener('click', function () {
        let cantidad = parseInt(cantidadSpan.textContent);
        if (cantidad > 1) {
            cantidad--;
            cantidadSpan.textContent = cantidad;
        }
    });

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const producto = this.getAttribute('data-producto');
            const precio = parseFloat(this.getAttribute('data-precio'));
            const cantidad = parseInt(cantidadSpan.textContent);
            agregarProducto(producto, precio, cantidad);
            cantidadSpan.textContent = 1;
        });
    });

    function agregarProducto(producto, precio, cantidad) {
        const fila = document.createElement('tr');
        const cantidadCell = document.createElement('td');
        const productoCell = document.createElement('td');
        const precioCell = document.createElement('td');
        const totalCell = document.createElement('td');

        const totalProducto = precio * cantidad;

        cantidadCell.textContent = cantidad;
        productoCell.textContent = producto;
        precioCell.textContent = precio.toFixed(2);
        totalCell.textContent = totalProducto.toFixed(2);

        fila.appendChild(cantidadCell);
        fila.appendChild(productoCell);
        fila.appendChild(precioCell);
        fila.appendChild(totalCell);
        tabla.querySelector('tbody').appendChild(fila);

        total += totalProducto;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
});

function buscarProductos(event) {
    if (event.key === 'Enter') {
        var codigo = document.getElementById('codigo').value;
        var control = false;
        for (var i = 0; i < productos.length; i++) {
            if (productos[i][0] === codigo) {
                var tabla = document.getElementById('tbody1');
                var fila = tabla.insertRow();
                var celda0 = fila.insertCell(0);
                celda0.innerHTML = "1";
                var celda1 = fila.insertCell(1);
                celda1.innerHTML = productos[i][1];
                var celda2 = fila.insertCell(2);
                celda2.innerHTML = productos[i][2];
                var celda3 = fila.insertCell(3);
                celda3.innerHTML = productos[i][2];
                total += parseFloat(productos[i][2]);
                document.getElementById('total').textContent = `$${total.toFixed(2)}`;
                control = true;
                document.getElementById('codigo').value = '';
                break;
            }
        }
        if (!control) {
            alert('Producto no encontrado');
        }
    }
}

function procesarPago(event) {
    if (event.key === 'Enter') {
        var montoRecibido = parseFloat(document.getElementById('monto-recibido').value);
        if (isNaN(montoRecibido)) {
            alert('Ingrese un monto válido');
            return;
        }
        var cambio = montoRecibido - total;
        cambio = parseFloat(cambio.toFixed(2));
        mostrarAlerta(`Cambio: $${cambio.toFixed(2)}`);
        total = 0;
        document.getElementById('monto-recibido').value = '';
        limpiarTabla();
    }
}

function mostrarAlerta(mensaje) {
    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.style.position = 'fixed';
    alerta.style.top = '50%';
    alerta.style.left = '50%';
    alerta.style.transform = 'translate(-50%, -50%)';
    alerta.style.backgroundColor = 'white';
    alerta.style.border = '2px solid black';
    alerta.style.padding = '20px';
    alerta.style.borderRadius = '10px';
    document.body.appendChild(alerta);
    setTimeout(() => {
        document.body.removeChild(alerta);
    }, 3000);
}

function finalizarVenta() {
    limpiarTabla();
    document.getElementById('total').textContent = '$0.00';
}

