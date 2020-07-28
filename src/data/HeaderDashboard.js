import React from 'react';
import { PageHeader, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/es';

export const HeaderDashboard = (props) => {
	return (
		<PageHeader
			style={{ border: '1px solid #ddd' }}
			className="wrapper-page-header--antd"
			title={props.title}
			subTitle={moment().format('DD [de] MMMM')}
			extra={
				props.extra
					? [
							<Button key="1" type="primary" onClick={props.onClick}>
								{props.textBtn}
							</Button>,
					  ]
					: null
			}
		/>
	);
};
