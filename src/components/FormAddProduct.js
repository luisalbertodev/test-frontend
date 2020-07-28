import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Alert } from 'antd';
import { InputNormal } from './InputNormal';
import { InputNumberNormal } from './InputNumberNormal';

export const FormAddProduct = (props) => {
	return (
		<>
			<Row>
				{props.messageError.length ? (
					<Alert message={props.messageError} type="error" style={{ margin: '0 0 20px', width: '100%' }} />
				) : null}
				<Col xs={12}>
					<form onSubmit={(e) => e.preventDefault()} noValidate>
						<Row>
							<InputNormal
								md={6}
								label={`SKU`}
								name={`sku`}
								value={props.data.sku || ''}
								onChange={props.onChange}
							/>
							<InputNormal
								md={6}
								label={`Nombre del producto`}
								name={`name`}
								value={props.data.name || ''}
								onChange={props.onChange}
							/>
							<InputNumberNormal
								md={6}
								label={`Precio`}
								value={props.data.price || 0}
								onChange={(e) => props.onNumber(e, 'price')}
							/>
							<InputNumberNormal
								md={6}
								label={`Cantidad`}
								value={props.data.quantity || 0}
								onChange={(e) => props.onNumber(e, 'quantity')}
							/>
						</Row>
					</form>
				</Col>
			</Row>
		</>
	);
};
