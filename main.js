function registrarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    // Validar que el nombre y el correo estén llenos
    if (!nombre || !email) {
        alert('❌Por favor, complete todos los campos.');
        return;
    }

    //validar que el correo sea valido
    if (!email.includes('@')) {
        alert('❌Por favor, ingrese un correo válido.');
        return;
    }

    const usuario = { id: Date.now(), nombre, email };
    
    // Almacenar en el almacenamiento local
    let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosRegistrados.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    // Limpiar campos del formulario
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';

    // Mostrar usuarios registrados
    mostrarUsuariosRegistrados();
}

function eliminarUsuario(id) {
    let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosRegistrados = usuariosRegistrados.filter(usuario => usuario.id !== id);
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    // Mostrar usuarios actualizados
    mostrarUsuariosRegistrados();
}

function mostrarUsuariosRegistrados() {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = '';

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuariosRegistrados.forEach(usuario => {
        const row = document.createElement('tr');
        const cellNombre = document.createElement('td');
        const cellEmail = document.createElement('td');
        const cellAcciones = document.createElement('td');
        const btnEliminar = document.createElement('button');

        cellNombre.textContent = usuario.nombre;
        cellEmail.textContent = usuario.email;

        cellNombre.className = 'border-b border-dashed border-indigo-500 px-4 py-2 text-center';
        cellEmail.className = 'border-b border-dashed border-indigo-500 px-4 py-2 text-center';
        cellAcciones.className = 'border-b border-dashed border-indigo-500 px-4 py-2 text-center';
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'bg-indigo-500 text-white rounded-md p-1 cursor-pointer hover:bg-indigo-600 transition-all duration-300 ease-in-out';
        btnEliminar.dataset.id = usuario.id;
        btnEliminar.onclick = () => eliminarUsuario(usuario.id);

        cellAcciones.appendChild(btnEliminar);

        row.appendChild(cellNombre);
        row.appendChild(cellEmail);
        row.appendChild(cellAcciones);

        userListElement.appendChild(row);
    });

    if (usuariosRegistrados.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.className = 'border px-4 py-2 text-center';
        cell.colSpan = 3;
        cell.textContent = 'No hay usuarios registrados 😢';
        row.appendChild(cell);
        userListElement.appendChild(row);
    }
}

// Mostrar usuarios al cargar la página
mostrarUsuariosRegistrados();