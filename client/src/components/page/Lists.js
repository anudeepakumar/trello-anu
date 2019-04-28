import React, { Component } from 'react';
import {Card, Button, Modal, Form, Breadcrumb} from 'react-bootstrap';
import { IoIosCloseCircleOutline, IoMdCreate, IoIosFolderOpen, IoMdOpen } from "react-icons/io";
import { Link } from 'react-router-dom';

class Lists extends Component {
	constructor () {
		super();

		this.handleListModalShow = this.handleListModalShow.bind(this);
		this.handleListModalClose = this.handleListModalClose.bind(this);

		this.state = {
			show: false,
			lists: [
				{
					"_id": "5cc38088aaf2f1745c1d7810",
					"name": "List 1",
					"date": "2019-04-26T22:04:56.156Z",
					"__v": 0
				},
				{
					"_id": "5cc3808baaf2f1745c1d7811",
					"name": "List 2",
					"date": "2019-04-26T22:04:59.416Z",
					"__v": 0
				},
				{
					"_id": "5cc3808daaf2f1745c1d7812",
					"name": "List 3",
					"date": "2019-04-26T22:05:01.978Z",
					"__v": 0
				}
			]
		};
	}

	handleListModalClose() {
	  this.setState({ show: false });
	}
  
	handleListModalShow() {
	  this.setState({ show: true });
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
                                <Button variant="danger" data-key={list._id}><IoIosCloseCircleOutline /> delete</Button>
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
