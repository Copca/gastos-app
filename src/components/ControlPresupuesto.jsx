import { useState, useEffect } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { formatearCantidad } from '../helpers';

const ControlPresupuesto = ({
	presupuesto,
	setPresupuesto,
	gastos,
	setGastos,
	setIsValidPresupuesto
}) => {
	const [disponible, setDisponible] = useState(0);
	const [gastado, setGastado] = useState(0);

	const [porcentaje, setPorcentaje] = useState(0);

	useEffect(() => {
		const totalGastado = gastos.reduce(
			(total, gasto) => Number(gasto.cantidad) + total,
			0
		);
		const totalDisponible = presupuesto - totalGastado;

		// Calcular el porcentaje gastado
		const nuevoPorcentaje = (
			((presupuesto - totalDisponible) / presupuesto) *
			100
		).toFixed(2);

		setDisponible(totalDisponible);
		setGastado(totalGastado);

		// Retardamos el state para ver la animación de circularProgressBar
		setTimeout(() => {
			setPorcentaje(nuevoPorcentaje);
		}, 1000);
	}, [gastos]);

	const handleClickReset = () => {
		const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

		if (resultado) {
			setPresupuesto(0);
			setGastos([]);
			setIsValidPresupuesto(false);
		}
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra dos-columnas'>
			<div>
				<CircularProgressbar
					value={porcentaje}
					text={`${porcentaje}% Gastado `}
					styles={buildStyles({
						pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
						trailColor: '#f5f5f5',
						textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
					})}
				/>
			</div>

			<div className='contenido-presupuesto'>
				<button type='button' className='reset-app' onClick={handleClickReset}>
					Resetear App
				</button>
				<p>
					<span>Presupuesto: </span> {formatearCantidad(presupuesto)}
				</p>

				<p className={`${disponible <= 0 ? 'negativo' : ''}`}>
					<span>Disponible: </span> {formatearCantidad(disponible)}
				</p>

				<p>
					<span>Gastado: </span> {formatearCantidad(gastado)}
				</p>
			</div>
		</div>
	);
};

export default ControlPresupuesto;
