import React, { Component } from 'react';
import { Card, Button, Modal, Form, Breadcrumb } from 'react-bootstrap';
import { IoIosCloseCircleOutline, IoMdCreate, IoIosFolderOpen, IoMdOpen } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Boards extends Component {
	constructor() {
		super();

		this.handleBoardModalShow = this.handleBoardModalShow.bind(this);
		this.handleBoardModalClose = this.handleBoardModalClose.bind(this);
		this.handleDataRefresh = this.handleDataRefresh.bind(this);
		this.handleDeleteBoard = this.handleDeleteBoard.bind(this);
		this.handleEditModalShow = this.handleEditModalShow.bind(this);
		this.handleTextCapture = this.handleTextCapture.bind(this);
		this.handleBoardSubmit = this.handleBoardSubmit.bind(this);

		this.state = {
			show: false,
			editEnable: false,
			boards: [],
			currentBoard: {}
		};
	}

	componentDidMount() {
		this.handleDataRefresh();
	}

	handleDataRefresh() {
		axios.get('/api/boards')
			.then((res)=>{
				this.setState({boards: res.data.data})
			})
			.catch((err)=>{

			});
	}

	handleBoardModalClose() {
		this.setState({ show: false, editEnable: false, currentBoard: {} });
		this.handleDataRefresh();
	}

	handleBoardModalShow() {
		this.setState({ show: true });
	}

    handleDeleteBoard(e) {
		axios.delete('/api/boards/'+e.currentTarget.dataset.key)
			.then((res)=>{
				this.handleDataRefresh()
			})
			.catch((err)=>{
				
			});
	}
	
	handleEditModalShow(e) {
		this.setState({ show:true, editEnable: true });
		axios.get('/api/board/'+e.currentTarget.dataset.key)
			.then((res) => {
				this.setState({currentBoard: res.data.data});
			})
			.catch((err) => {

			});
	}

	handleTextCapture(e) {
		let currentBoard = {...this.state.currentBoard};
		currentBoard.name = e.target.value;
		this.setState({currentBoard});
	}

	handleBoardSubmit(e) {
		e.preventDefault()
		if(this.state.editEnable) {
			axios.put('/api/boards/'+this.state.currentBoard._id, {name: this.state.currentBoard.name})
				.then((res) => {
					this.handleBoardModalClose();
				})
				.catch((err) => {

				});
		} else {
			axios.post('/api/boards', {name: this.state.currentBoard.name})
				.then((res) => {
					this.handleBoardModalClose();
				})
				.catch((err) => {
					
				});
		}
	}

	render() {
		let addModal = "Add a board";
		if(this.state.editEnable) {
			addModal = "Edit board";
		}
		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item active>Boards</Breadcrumb.Item>
				</Breadcrumb>
				<h1>Boards</h1>
				<Button variant="success" onClick={this.handleBoardModalShow}><IoMdOpen /> create</Button>
				<br />
				{this.state.boards.map((board, i) => (
					<div key={board._id}>
						<br />
						<Card bg="light">
							<Card.Body>
								<Card.Title>{board.name}</Card.Title>
								<Link to={`/lists/${board._id}`}><Button variant="primary" data-key={board._id}><IoIosFolderOpen /> open</Button></Link>&nbsp;
								<Button variant="secondary" data-key={board._id} onClick={this.handleEditModalShow}><IoMdCreate /> edit</Button>&nbsp;
								<Button variant="danger" data-key={board._id} onClick={this.handleDeleteBoard}><IoIosCloseCircleOutline /> delete</Button>
							</Card.Body>
						</Card>
					</div>
				))}

				{/* Board Modal  */}
				<Modal show={this.state.show} onHide={this.handleBoardModalClose}>
					<Modal.Header closeButton>
						<Modal.Title>{addModal}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleBoardSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" onChange={this.handleTextCapture} value={this.state.currentBoard.name} required/>
							</Form.Group>
							<Button variant="primary" type="submit">
								Submit
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default Boards;
