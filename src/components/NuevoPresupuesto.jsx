import { useState } from 'react';

import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {
	const [mensaje, setMensaje] = useState('');

	const handleSubmit = e => {
		e.preventDefault();

		// validar input
		if (!presupuesto || presupuesto <= 0) {
			setMensaje('No es presupuesto válido');
			return;
		}

		// Quitamos el mensaje de alerta
		setMensaje('');
		setIsValidPresupuesto(true);
	};

	return (
		<div className='contenedor-presupuesto contenedor sombra'>
			<form onSubmit={handleSubmit} className='formulario'>
				<div className='campo'>
					<label>Definir Presupuesto</label>

					<input
						type='number'
						className='nuevo-presupuesto'
						placeholder='Añade tu presupuesto'
						value={presupuesto}
						onChange={e => setPresupuesto(Number(e.target.value))}
					/>
				</div>

				<input type='submit' value='Añadir' />

				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
			</form>
		</div>
	);
};

export default NuevoPresupuesto;
