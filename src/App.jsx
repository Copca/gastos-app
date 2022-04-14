import { useState, useEffect } from 'react';
import IconoNuevoGasto from './img/nuevo-gasto.svg';

import Header from './components/Header';
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtro from './components/Filtro';

const App = () => {
	const [presupuesto, setPresupuesto] = useState(
		Number(localStorage.getItem('presupuesto'))
	);
	const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

	const [modal, setModal] = useState(false);
	const [animarModal, setAnimarModal] = useState(false);

	const [gastos, setGastos] = useState(
		JSON.parse(localStorage.getItem('gastos')) || []
	);

	const [gastoEditar, setGastoEditar] = useState({});

	const [filtro, setFiltro] = useState('');
	const [gastosFiltrados, setGastosFiltrados] = useState([]);

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			handleClickNuevoGasto();
		}
	}, [gastoEditar]);

	useEffect(() => {
		localStorage.setItem('presupuesto', presupuesto || 0);
	}, [presupuesto]);

	useEffect(() => {
		localStorage.setItem('gastos', JSON.stringify(gastos) || []);
	}, [gastos]);

	useEffect(() => {
		if (filtro) {
			// Filtrar gastos por categoría
			const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);

			setGastosFiltrados(gastosFiltrados);
		}
	}, [filtro]);

	useEffect(() => {
		const presupuestoLS = Number(localStorage.getItem('presupuesto')) || 0;

		if (presupuestoLS > 0) {
			// Mosttral la pantalla de ControlPresupuesto
			setIsValidPresupuesto(true);
		}
	}, []);

	const handleClickNuevoGasto = () => {
		setModal(true);

		setTimeout(() => {
			setAnimarModal(true);
		}, 500);
	};

	const guardarGasto = (gasto, edicion = false) => {
		// Revisar si es Nuevo Gasto o Editar Gasto
		if (edicion) {
			const gastosActualizados = gastos.map(gastoState =>
				gastoState.id === gasto.id ? gasto : gastoState
			);

			setGastos(gastosActualizados);
		} else {
			setGastos([...gastos, gasto]);
		}
	};

	const eliminarGasto = id => {
		const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

		setGastos(gastosActualizados);
	};

	return (
		<div className={modal ? 'fijar' : ''}>
			<Header
				presupuesto={presupuesto}
				setPresupuesto={setPresupuesto}
				isValidPresupuesto={isValidPresupuesto}
				setIsValidPresupuesto={setIsValidPresupuesto}
				gastos={gastos}
				setGastos={setGastos}
			/>

			{isValidPresupuesto && (
				<>
					<main>
						<Filtro filtro={filtro} setFiltro={setFiltro} />

						<ListadoGastos
							gastos={gastos}
							filtro={filtro}
							setGastoEditar={setGastoEditar}
							eliminarGasto={eliminarGasto}
							gastosFiltrados={gastosFiltrados}
						/>
					</main>

					<div className='nuevo-gasto'>
						<img
							src={IconoNuevoGasto}
							alt='icono nuevo gasto'
							onClick={handleClickNuevoGasto}
						/>
					</div>
				</>
			)}

			{modal && (
				<Modal
					setModal={setModal}
					animarModal={animarModal}
					setAnimarModal={setAnimarModal}
					guardarGasto={guardarGasto}
					gastoEditar={gastoEditar}
					setGastoEditar={setGastoEditar}
				/>
			)}
		</div>
	);
};

export default App;
