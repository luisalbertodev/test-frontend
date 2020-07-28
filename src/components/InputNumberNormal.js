import React from 'react';
import { InputNumber } from 'antd';
import { Col } from 'react-flexbox-grid';
import { WrapperInput } from './WrapperInput';

export const InputNumberNormal = (props) => {
	return (
		<WrapperInput xs={props.xs} md={props.md} label={props.label} className={props.className}>
			<Col xs={12}>
				<InputNumber
					className="wrapper-select-width"
					min={1}
					max={999}
					value={props.value}
					formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
					onChange={props.onChange}
				/>
			</Col>
		</WrapperInput>
	);
};
