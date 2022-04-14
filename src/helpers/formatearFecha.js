const formatearFecha = fecha => {
	const fechaFormateada = new Date(fecha);
	const opciones = {
		year: 'numeric',
		month: 'long',
		day: '2-digit'
	};

	return fechaFormateada.toLocaleDateString('es-MX', opciones);
};

export { formatearFecha };
