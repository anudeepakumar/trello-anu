import React, { Component } from 'react';
import {Card, Button, Modal, Form, Breadcrumb} from 'react-bootstrap';
import { IoIosCloseCircleOutline, IoMdCreate, IoIosFolderOpen, IoMdOpen } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Lists extends Component {
	constructor () {
		super();

		this.handleListModalShow = this.handleListModalShow.bind(this);
		this.handleListModalClose = this.handleListModalClose.bind(this);
		this.handleDataRefresh = this.handleDataRefresh.bind(this);
		this.handleDeleteList = this.handleDeleteList.bind(this);

		this.state = {
			show: false,
			lists: []
		};
	}

	componentDidMount() {
		this.handleDataRefresh();
	}

	handleDataRefresh() {
		axios.get('/api/lists/'+this.props.match.params.boardId)
			.then((res)=>{
				this.setState({lists: res.data.data})
			})
			.catch((err)=>{

			});
	}

	handleListModalClose() {
	  this.setState({ show: false });
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

	render() {
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
						<Card>
							<Card.Body>
								<Card.Title>{list.name}</Card.Title>
								<Link to={`/cards/${list._id}`}><Button variant="primary" data-key={list._id}><IoIosFolderOpen /> open</Button></Link>&nbsp;
                                <Button variant="secondary" data-key={list._id} onClick={this.handleListModalShow}><IoMdCreate /> edit</Button>&nbsp;
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
                    <Modal.Body><Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
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

export default Lists;
