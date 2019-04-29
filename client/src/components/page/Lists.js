import React, { Component } from 'react';
import {Card, Button, Modal, Form, Breadcrumb} from 'react-bootstrap';
import { IoIosCloseCircleOutline, IoMdCreate, IoIosFolderOpen, IoMdOpen } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Lists extends Component {
	constructor (props) {
		super(props);

		this.handleListModalShow = this.handleListModalShow.bind(this);
		this.handleListModalClose = this.handleListModalClose.bind(this);
		this.handleDataRefresh = this.handleDataRefresh.bind(this);
		this.handleDeleteList = this.handleDeleteList.bind(this);
		this.handleEditModalShow = this.handleEditModalShow.bind(this);
		this.handleTextCapture = this.handleTextCapture.bind(this);
		this.handleListSubmit = this.handleListSubmit.bind(this);

		this.state = {
			show: false,
			editEnable: false,
			lists: [],
			currentList: {},
			boardId: props.match.params.boardId
		};
	}

	componentDidMount() {
		this.handleDataRefresh();
	}

	handleDataRefresh() {
		axios.get('/api/lists/'+this.state.boardId)
			.then((res)=>{
				this.setState({lists: res.data.data})
			})
			.catch((err)=>{

			});
	}

	handleListModalClose() {
	  this.setState({ show: false, editEnable: false, currentList: {} });
	  this.handleDataRefresh()
	}
  
	handleListModalShow() {
	  this.setState({ show: true });
	}

    handleDeleteList(e) {
		axios.delete('/api/lists/'+e.currentTarget.dataset.key)
			.then((res)=>{
				this.handleDataRefresh()
			})
			.catch((err)=>{

			});
    }
	
	handleEditModalShow(e) {
		this.setState({ show:true, editEnable: true });
		axios.get('/api/list/'+e.currentTarget.dataset.key)
			.then((res) => {
				this.setState({currentList: res.data.data});
			})
			.catch((err) => {

			});
	}

	handleTextCapture(e) {
		let currentList = {...this.state.currentList};
		currentList.name = e.target.value;
		this.setState({currentList});
	}

	handleListSubmit(e) {
		e.preventDefault()
		if(this.state.editEnable) {
			axios.put('/api/lists/'+this.state.currentList._id, {name: this.state.currentList.name})
				.then((res) => {
					this.handleListModalClose();
				})
				.catch((err) => {

				});
		} else {
			axios.post('/api/lists/'+this.state.boardId, {name: this.state.currentList.name})
				.then((res) => {
					this.handleListModalClose();
				})
				.catch((err) => {
					
				});
		}
	}

	render() {
		let addModal = "Add a list";
		if(this.state.editEnable) {
			addModal = "Edit list";
		}
		return (
			<div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/boards">Boards</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Lists</Breadcrumb.Item>
                </Breadcrumb>
				<h1>Lists</h1>
				<Button variant="success" onClick={this.handleListModalShow}><IoMdOpen/> create</Button>
				<br/>
				{this.state.lists.map((list, i) => (
					<div key={list._id}>
						<br />
						<Card bg="light">
							<Card.Body>
								<Card.Title>{list.name}</Card.Title>
								<Link to={`/cards/${list._id}`}><Button variant="primary" data-key={list._id}><IoIosFolderOpen /> open</Button></Link>&nbsp;
                                <Button variant="secondary" data-key={list._id} onClick={this.handleEditModalShow}><IoMdCreate /> edit</Button>&nbsp;
                                <Button variant="danger" data-key={list._id} onClick={this.handleDeleteList}><IoIosCloseCircleOutline /> delete</Button>
							</Card.Body>
						</Card>
					</div>
				))}

                {/* List Modal  */}
                <Modal show={this.state.show} onHide={this.handleListModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
						<Form onSubmit={this.handleListSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Title</Form.Label>
								<Form.Control type="text" onChange={this.handleTextCapture} value={this.state.currentList.name} required/>
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

export default Lists;
