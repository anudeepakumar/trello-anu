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

		this.state = {
			show: false,
			boards: []
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
		this.setState({ show: false });
	}

	handleBoardModalShow() {
		this.setState({ show: true });
	}

    handleDeleteBoard(e) {
		console.log("here1")
		axios.delete('/api/boards/'+e.currentTarget.dataset.key)
			.then((res)=>{
				this.handleDataRefresh()
			})
			.catch((err)=>{
				
			});
    }

	render() {
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
						<Card>
							<Card.Body>
								<Card.Title>{board.name}</Card.Title>
								<Link to={`/lists/${board._id}`}><Button variant="primary" data-key={board._id}><IoIosFolderOpen /> open</Button></Link>&nbsp;
								<Button variant="secondary" data-key={board._id} onClick={this.handleBoardModalShow}><IoMdCreate /> edit</Button>&nbsp;
								<Button variant="danger" data-key={board._id} onClick={this.handleDeleteBoard}><IoIosCloseCircleOutline /> delete</Button>
							</Card.Body>
						</Card>
					</div>
				))}

				{/* Board Modal  */}
				<Modal show={this.state.show} onHide={this.handleBoardModalClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add a board</Modal.Title>
					</Modal.Header>
					<Modal.Body><Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" />
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
