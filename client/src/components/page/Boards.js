import React, { Component } from 'react';
import { Card, Button, Modal, Form, Breadcrumb } from 'react-bootstrap';
import { IoIosCloseCircleOutline, IoMdCreate, IoIosFolderOpen, IoMdOpen } from "react-icons/io";
import { Link } from 'react-router-dom';

class Boards extends Component {
	constructor() {
		super();

		this.handleBoardModalShow = this.handleBoardModalShow.bind(this);
		this.handleBoardModalClose = this.handleBoardModalClose.bind(this);

		this.state = {
			show: false,
			boards: [
				{
					"_id": "5cc38088aaf2f1745c1d7810",
					"name": "Board 1",
					"date": "2019-04-26T22:04:56.156Z",
					"__v": 0
				},
				{
					"_id": "5cc3808baaf2f1745c1d7811",
					"name": "Board 2",
					"date": "2019-04-26T22:04:59.416Z",
					"__v": 0
				},
				{
					"_id": "5cc3808daaf2f1745c1d7812",
					"name": "Board 3",
					"date": "2019-04-26T22:05:01.978Z",
					"__v": 0
				}
			]
		};
	}

	handleBoardModalClose() {
		this.setState({ show: false });
	}

	handleBoardModalShow() {
		this.setState({ show: true });
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
								<Button variant="danger" data-key={board._id}><IoIosCloseCircleOutline /> delete</Button>
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
