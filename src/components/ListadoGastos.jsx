import Gasto from './Gasto';

const ListadoGastos = ({
	gastos,
	setGastoEditar,
	eliminarGasto,
	filtro,
	gastosFiltrados
}) => {
	const arregloGastos = filtro ? gastosFiltrados : gastos;

	return (
		<div className='listado-gastos contenedor'>
			<h2>{arregloGastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>

			{arregloGastos.map(gasto => (
				<Gasto
					key={gasto.id}
					gasto={gasto}
					setGastoEditar={setGastoEditar}
					eliminarGasto={eliminarGasto}
				/>
			))}
		</div>
	);
};

export default ListadoGastos;
