const formatearCantidad = (cantidad = 0) => {
	return cantidad.toLocaleString('es-MX', {
		style: 'currency',
		currency: 'MXN'
	});
};

export { formatearCantidad };
