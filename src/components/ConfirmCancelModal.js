import React from 'react';
import { Popconfirm } from 'antd';

export const ConfirmCancelModal = ({ onConfirm, onCancel }) => {
	return (
		<Popconfirm
			title="¿Deseas salir sin guardar cambios?"
			onConfirm={onConfirm}
			onCancel={onCancel}
			okText="Si"
			cancelText="No"
		>
			<a>Cancelar</a>
		</Popconfirm>
	);
};
