import React, { Component } from 'react';
import { Card, Button, Modal, ListGroup, ListGroupItem, Form, Breadcrumb } from 'react-bootstrap';
import { IoIosCloseCircleOutline, IoMdCreate, IoIosChatboxes, IoMdOpen, IoIosMove } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Cards extends Component {
	constructor(props) {
		super(props);

		this.handleCardModalShow = this.handleCardModalShow.bind(this);
		this.handleCardModalClose = this.handleCardModalClose.bind(this);
		this.handleMoveModalShow = this.handleMoveModalShow.bind(this);
		this.handleCommentModalShow = this.handleCommentModalShow.bind(this);
		this.handleDeleteCard = this.handleDeleteCard.bind(this);
		this.handleDataRefresh = this.handleDataRefresh.bind(this);
		this.handleEditModalShow = this.handleEditModalShow.bind(this);
		this.handleNameCapture = this.handleNameCapture.bind(this);
		this.handleDescriptionCapture = this.handleDescriptionCapture.bind(this);
		this.handleCommentCapture = this.handleCommentCapture.bind(this);
		this.handleCardSubmit = this.handleCardSubmit.bind(this);
		this.handleListSelection = this.handleListSelection.bind(this);

		this.state = {
			show: false,
			editEnable: false,
			commentEnable: false,
			moveModal: false,
			commentModal: false,
			cards: [],
			currentCard: {},
			boardId: null,
			listId: props.match.params.listId,
			lists: [
				{
					_id: 1,
					name: "List 1"
				}
			],
			newListId: props.match.params.listId
		};
	}

	componentDidMount() {
		this.handleDataRefresh();
		axios.get('/api/list/' + this.state.listId)
			.then((res) => {
				this.setState({ boardId: res.data.data.boardId })
			})
			.catch((err) => {

			});
	}

	handleDataRefresh() {
		axios.get('/api/cards/' + this.state.listId)
			.then((res) => {
				this.setState({ cards: res.data.data })
			})
			.catch((err) => {

			});
	}

	handleCardModalClose() {
		this.setState({ show: false, commentModal: false, moveModal: false, editEnable: false, commentEnable: false, moveEnable: false, currentCard: {}, newListId: this.state.listId });
		this.handleDataRefresh();
	}

	handleCardModalShow() {
		this.setState({ show: true });
	}

	handleMoveModalShow(e) {
		this.setState({ moveModal: true, moveEnable: true });
		axios.get('/api/lists/' + this.state.boardId)
			.then((res) => {
				this.setState({ lists: res.data.data });
			})
			.catch((err) => {

			});
		axios.get('/api/card/' + e.currentTarget.dataset.key)
			.then((res) => {
				this.setState({ currentCard: res.data.data });
			})
			.catch((err) => {

			});
	}

	handleCommentModalShow(e) {
		this.setState({ commentModal: true, commentEnable: true });
		axios.get('/api/card/' + e.currentTarget.dataset.key)
			.then((res) => {
				this.setState({ currentCard: res.data.data });
			})
			.catch((err) => {

			});
	}

	handleDeleteCard(e) {
		axios.delete('/api/cards/' + e.currentTarget.dataset.key)
			.then((res) => {
				this.handleDataRefresh()
			})
			.catch((err) => {

			});
	}

	handleEditModalShow(e) {
		this.setState({ show: true, editEnable: true });
		axios.get('/api/card/' + e.currentTarget.dataset.key)
			.then((res) => {
				this.setState({ currentCard: res.data.data });
			})
			.catch((err) => {

			});
	}

	handleNameCapture(e) {
		let currentCard = { ...this.state.currentCard };
		currentCard.name = e.target.value;
		this.setState({ currentCard });
	}

	handleDescriptionCapture(e) {
		let currentCard = { ...this.state.currentCard };
		currentCard.description = e.target.value;
		this.setState({ currentCard });
	}

	handleCommentCapture(e) {
		let currentCard = { ...this.state.currentCard };
		currentCard.body = e.target.value;
		this.setState({ currentCard });
	}

	handleListSelection(e) {
		this.setState({newListId: e.target.value})
	}

	handleCardSubmit(e) {
		e.preventDefault()
		if (this.state.editEnable) {
			axios.put('/api/cards/' + this.state.currentCard._id, { name: this.state.currentCard.name, description: this.state.currentCard.description })
				.then((res) => {
					this.handleCardModalClose();
				})
				.catch((err) => {

				});
		} else if (this.state.commentEnable) {
			axios.put('/api/cards/' + this.state.currentCard._id + '/add_comment', { body: this.state.currentCard.body })
				.then((res) => {
					this.handleCardModalClose();
				})
				.catch((err) => {

				});
		} else if (this.state.moveEnable) {
			axios.put('/api/cards/' + this.state.currentCard._id + '/move/' + this.state.newListId)
				.then((res) => {
					this.handleCardModalClose();
				})
				.catch((err) => {

				});
		} else {
			axios.post('/api/cards/' + this.state.boardId + '/' + this.state.listId, { name: this.state.currentCard.name, description: this.state.currentCard.description })
				.then((res) => {
					this.handleCardModalClose();
				})
				.catch((err) => {

				});
		}
	}

	render() {
		let addModal = "Add a card";
		if (this.state.editEnable) {
			addModal = "Edit card";
		}
		return (
			<div>
				<Breadcrumb>
					<Breadcrumb.Item><Link to="/boards">Boards</Link></Breadcrumb.Item>
					<Breadcrumb.Item><Link to={`/lists/${this.state.boardId}`}>Lists</Link></Breadcrumb.Item>
					<Breadcrumb.Item active>Cards</Breadcrumb.Item>
				</Breadcrumb>
				<h1>Cards</h1>
				<Button variant="success" onClick={this.handleCardModalShow}><IoMdOpen /> create</Button>
				<br />
				{this.state.cards.map((card, i) => (
					<div key={card._id}>
						<br />
						<Card bg="light">
							<Card.Body>
								<Card.Title>{card.name}</Card.Title>
								<Card.Text>{card.description}</Card.Text>
								<br />
								<Card.Subtitle>Comments:</Card.Subtitle>
							</Card.Body>
							<ListGroup className="list-group-flush">
								{card.comments.map((comment, i) => (
									<ListGroupItem key={comment._id}>{comment.body}</ListGroupItem>
								))}

							</ListGroup>
							<Card.Body>
								<Button variant="secondary" data-key={card._id} onClick={this.handleEditModalShow}><IoMdCreate /> edit</Button>&nbsp;
                                <Button variant="warning" data-key={card._id} onClick={this.handleMoveModalShow}><IoIosMove /> move</Button>&nbsp;
                                <Button variant="info" data-key={card._id} onClick={this.handleCommentModalShow}><IoIosChatboxes /> comment</Button>&nbsp;
                                <Button variant="danger" data-key={card._id} onClick={this.handleDeleteCard}><IoIosCloseCircleOutline /> delete</Button>
							</Card.Body>
						</Card>
					</div>
				))}
				<br />

				{/* Card Modal  */}
				<Modal show={this.state.show} onHide={this.handleCardModalClose}>
					<Modal.Header closeButton>
						<Modal.Title>{addModal}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleCardSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" onChange={this.handleNameCapture} value={this.state.currentCard.name} required />
							</Form.Group>
							<Form.Group controlId="formBasicPassword">
								<Form.Label>Description</Form.Label>
								<Form.Control type="text" onChange={this.handleDescriptionCapture} value={this.state.currentCard.description} required />
							</Form.Group>
							<Button variant="primary" type="submit">
								Submit
                            </Button>
						</Form>
					</Modal.Body>
				</Modal>

				{/* Move Modal  */}
				<Modal show={this.state.moveModal} onHide={this.handleCardModalClose}>
					<Modal.Header closeButton>
						<Modal.Title>Move card to other list</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleCardSubmit}>
							<Form.Group controlId="formGridState">
								<Form.Control as="select" onChange={this.handleListSelection} required>
									<option disabled selected>Choose from following list</option>
									{this.state.lists.map((list, i) => {
										if(list._id == this.state.newListId) {
											return (
												<option key={list._id} value={list._id} selected>{list.name}</option>
											)
										} else {
											return (
												<option key={list._id} value={list._id}>{list.name}</option>
											)
										}
									})}
								</Form.Control>
							</Form.Group>
							<Button variant="primary" type="submit" >Move</Button>
						</Form>
					</Modal.Body>
				</Modal>

				{/* Comment Modal  */}
				<Modal show={this.state.commentModal} onHide={this.handleCardModalClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add a comment</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleCardSubmit}>
							<Form.Group controlId="formGridState">
								<Form.Control type="text" onChange={this.handleCommentCapture} value={this.state.currentCard.body} required />
							</Form.Group>
							<Button variant="primary" type="submit">Comment</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default Cards;
