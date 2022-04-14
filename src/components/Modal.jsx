import { useState, useEffect } from 'react';

import { generarId } from '../helpers';

import cerrarBtn from '../img/cerrar.svg';
import Mensaje from './Mensaje';

const Modal = ({
	setModal,
	animarModal,
	setAnimarModal,
	guardarGasto,
	gastoEditar,
	setGastoEditar
}) => {
	const [datosInput, setDatosInput] = useState({
		id: '',
		nombre: '',
		cantidad: '',
		categoria: '',
		fecha: ''
	});
	const [mensaje, setMensaje] = useState('');

	const { nombre, cantidad, categoria } = datosInput;

	useEffect(() => {
		if (Object.keys(gastoEditar).length > 0) {
			// console.log('modo edicion');
			setDatosInput(gastoEditar);
		}
	}, []);

	const handleClickCerrarModal = () => {
		setGastoEditar({});

		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	};

	const handleChangeInput = e => {
		setDatosInput({
			...datosInput,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		// Validar inputs
		if ([nombre.trim(), cantidad, categoria].includes('') || cantidad <= 0) {
			setMensaje('Todos los campos son obligatorios');

			setTimeout(() => {
				setMensaje('');
			}, 2000);

			return;
		}

		// Borramos el mensaeje de error
		setMensaje('');

		// SAber si estamos editando o guardano nuevo gasto
		if (Object.keys(gastoEditar).length > 0) {
			// Modo edición
			guardarGasto(datosInput, true);
		} else {
			// Modo Nuevo Gasto
			datosInput.id = generarId();
			datosInput.fecha = Date.now();

			guardarGasto(datosInput);
		}

		// Resetear valores del formulario
		setDatosInput({
			id: '',
			nombre: '',
			cantidad: '',
			categoria: '',
			fecha: ''
		});

		// Cerramos el modal
		setAnimarModal(false);
		setTimeout(() => {
			setModal(false);
		}, 500);
	};
	return (
		<div className='modal'>
			<div className='cerrar-modal'>
				<img
					src={cerrarBtn}
					alt='cerrar modal'
					onClick={handleClickCerrarModal}
				/>
			</div>

			<form
				onSubmit={handleSubmit}
				className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
			>
				<legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo Gasto'}</legend>

				{mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

				<div className='campo'>
					<label htmlFor='nombre'>Nombre Gasto</label>
					<input
						type='text'
						id='nombre'
						name='nombre'
						placeholder='Añade el nombre del gasto'
						value={nombre}
						onChange={handleChangeInput}
					/>
				</div>

				<div className='campo'>
					<label htmlFor='cantidad'>Cantidad</label>
					<input
						type='number'
						id='cantidad'
						name='cantidad'
						placeholder='Añade la cantidad del gasto'
						value={cantidad}
						onChange={handleChangeInput}
					/>
				</div>

				<div className='campo'>
					<label htmlFor='categoria'>Categoría</label>
					<select
						id='categoria'
						name='categoria'
						value={categoria}
						onChange={handleChangeInput}
					>
						<option value=''>-- Selecione --</option>
						<option value='ahorro'>Ahorro</option>
						<option value='comida'>Comida</option>
						<option value='casa'>Casa</option>
						<option value='gastos'>Gastos</option>
						<option value='ocio'>Ocio</option>
						<option value='salud'>Salud</option>
						<option value='suscripciones'>Suscripciones</option>
					</select>
				</div>

				<input
					type='submit'
					value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'}
				/>
			</form>
		</div>
	);
};

export default Modal;
