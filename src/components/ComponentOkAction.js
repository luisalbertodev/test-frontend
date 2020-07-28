import React from 'react';
import { Icon } from 'antd';

export const ComponentOkAction = ({ upload }) => {
	return upload ? (
		<>
			<Icon type="loading" />
			Guardando...
		</>
	) : (
		'Guardar'
	);
};
