import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { API_TOKEN } from '../data/Constans';
import { Header } from '../components/Header';
import { FormAddProduct } from '../components/FormAddProduct';
import { ConfirmCancelModal } from '../components/ConfirmCancelModal';
import { ComponentOkAction } from '../components/ComponentOkAction';

import { Table, Alert, Modal, notification } from 'antd';

export class Products extends Component {
	state = {
		data: [],
		order: '',
		showFormModal: false,
		isChargeForm: false,
		loading: false,
		showAlert: false,
		type: '',
		messageError: '',
		product: {
			number: '',
			sku: '',
			name: '',
			quantity: 0,
			price: 0,
		},
		_product: {
			number: '',
			sku: '',
			name: '',
			quantity: 0,
			price: 0,
		},
	};

	getListProducts = async () => {
		const config = {
			headers: { Authorization: API_TOKEN },
		};

		try {
			const data = [];

			const res = await axios('https://eshop-deve.herokuapp.com/api/v2/orders', config);
			res.data.orders.forEach((e) => e.items.forEach((item) => data.push({ ...item, number: e.number })));
			this.setState({ data });
		} catch (error) {
			console.log(error);
			console.log('Error al obtener los datos');
		}
	};

	componentDidMount() {
		this.getListProducts();
	}

	handleShowProduct = (order) => {
		this.setState({ order, showAlert: true });
	};

	handleClose = () => {
		this.setState({ showAlert: false });
	};

	handleShowFormModal = () => {
		this.setState({ showFormModal: !this.state.showFormModal });
	};

	handleOk = (e) => {
		if (this.state.product.sku.length) {
			if (this.state.product.name.length) {
				if (this.state.product.quantity > 0) {
					if (this.state.product.price > 0) {
						this.setState({ isChargeForm: true });
						const data = {
							...this.state.product,
							number: Math.round(Math.random() * 1000) * 32,
							id: `YHK-${Math.round(Math.random() * 1000) * 32}-NYA`,
						};

						setTimeout(() => this.handleAddProduct(data), 100);
					} else this.setState({ messageError: 'Ingresa el precio del producto' });
				} else this.setState({ messageError: 'Ingresa la cantidad de unidades disponibles' });
			} else this.setState({ messageError: 'Falta el nombre del producto' });
		} else this.setState({ messageError: 'Falta el sku del producto' });
	};

	handleAddProduct = (data) => {
		this.state.data.push({ ...data });
		this.setState({ ...this.state });

		setTimeout(() => {
			this.setState({
				showFormModal: false,
				isChargeForm: false,
				product: this.state._product,
			});

			this.handleShowNotification('success', 'Producto Agregado con exito');
		}, 1200);
	};

	handleShowNotification = (type, title) => {
		notification[type]({
			message: title,
			description: `Este cambio ya se ha aplicado en el sistema`,
		});
	};

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({ product: { ...this.state.product, [name]: value } });
	};

	handleOnChangeNumber = (value, type) => {
		this.setState({ product: { ...this.state.product, [type]: value } });
	};

	showItemCardModal() {
		const { isChargeForm, messageError, product, _product } = this.state;
		let isChangeData = JSON.stringify(product) === JSON.stringify(_product);
		return (
			<Modal
				title="Información del producto"
				visible={this.state.showFormModal}
				maskClosable={false}
				onOk={this.handleOk}
				okText={<ComponentOkAction upload={isChargeForm} />}
				okButtonProps={{ disabled: isChangeData === false ? false : true }}
				closable={false}
				onCancel={isChangeData === false ? null : this.handleShowFormModal}
				cancelText={
					isChangeData === false ? (
						<ConfirmCancelModal onConfirm={this.handleShowFormModal} onCancel={() => {}} />
					) : null
				}
			>
				<FormAddProduct
					data={product}
					messageError={messageError}
					onChange={this.handleInputChange}
					onNumber={this.handleOnChangeNumber}
					onSelect={this.handleSelect}
				/>
			</Modal>
		);
	}

	render() {
		const { data, order, showAlert } = this.state;

		const columns = [
			{
				title: 'SKU',
				dataIndex: 'sku',
				fixed: 'left',
				width: 160,
				render: (value, record) => (
					<a href={null} onClick={() => this.handleShowProduct(record.number)}>
						{record.sku}
					</a>
				),
			},
			{
				title: 'Nombre',
				dataIndex: 'name',
			},
			{
				title: 'Cantidad',
				dataIndex: 'quantity',
				width: 160,
			},
			{
				title: 'Precio',
				dataIndex: 'price',
				width: 160,
			},
		];

		return (
			<Grid>
				<Row style={{ width: '100%', margin: 'auto' }}>
					<Col xs={12}>
						<Header
							extra
							title="Lista de Productos"
							onClick={this.handleShowFormModal}
							textBtn="AGREGAR PRODUCTO"
						/>
						{showAlert ? (
							<Alert
								closable
								type="warning"
								className="mt-1"
								afterClose={this.handleClose}
								message={`Seleccionaste la orden ${order}`}
							/>
						) : null}

						<Row className="pt-1">
							<Col xs={12}>
								<Table
									bordered
									columns={columns}
									rowKey={(record) => record.id}
									scroll={{ x: 'calc(200px + 100%)', y: 800 }}
									dataSource={data}
									pagination={{ pageSize: 10 }}
								/>
							</Col>
						</Row>
						{this.showItemCardModal()}
					</Col>
				</Row>
			</Grid>
		);
	}
}
