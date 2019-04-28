import React, { Component } from 'react';
import { Card, Button, Modal, ListGroup, ListGroupItem, Form, Breadcrumb } from 'react-bootstrap';
import { IoIosCloseCircleOutline, IoMdCreate, IoIosChatboxes, IoMdOpen, IoIosMove } from "react-icons/io";
import { Link } from 'react-router-dom';

class Cards extends Component {
    constructor() {
        super();

        this.handleCardModalShow = this.handleCardModalShow.bind(this);
        this.handleCardModalClose = this.handleCardModalClose.bind(this);
        this.handleMoveModalClose = this.handleMoveModalClose.bind(this);
        this.handleMoveModalShow = this.handleMoveModalShow.bind(this);
        this.handleCommentModalClose = this.handleCommentModalClose.bind(this);
        this.handleCommentModalShow = this.handleCommentModalShow.bind(this);

        this.state = {
            show: false,
            moveModal: false,
            commentModal: false,
            cards: [
                {
                    "_id": "5cc38088aaf2f1745c1d7810",
                    "name": "Card 1",
                    "description": "jshgdf jasfgj KAk kshefgked kshfgkh aks abkv ja a ksdbfi a klshfk 123",
                    "date": "2019-04-26T22:04:56.156Z",
                    "__v": 0
                },
                {
                    "_id": "5cc3808baaf2f1745c1d7811",
                    "name": "Card 2",
                    "description": "jshgdf jasfgj KAk kshefgked kshfgkh aks abkv ja a ksdbfi a klshfk 123",
                    "date": "2019-04-26T22:04:59.416Z",
                    "__v": 0
                },
                {
                    "_id": "5cc3808daaf2f1745c1d7812",
                    "name": "Card 3",
                    "description": "jshgdf jasfgj KAk kshefgked kshfgkh aks abkv ja a ksdbfi a klshfk 123",
                    "date": "2019-04-26T22:05:01.978Z",
                    "__v": 0
                }
            ]
        };
    }

    handleCardModalClose() {
        this.setState({ show: false });
    }

    handleCardModalShow() {
        this.setState({ show: true });
    }

    handleMoveModalClose() {
        this.setState({ moveModal: false });
    }

    handleMoveModalShow() {
        this.setState({ moveModal: true });
    }

    handleCommentModalClose() {
        this.setState({ commentModal: false });
    }

    handleCommentModalShow() {
        this.setState({ commentModal: true });
    }

    render() {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/boards">Boards</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/lists/aaa">Lists</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Cards</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Cards</h1>
                <Button variant="success" onClick={this.handleCardModalShow}><IoMdOpen /> create</Button>
                <br />
                {this.state.cards.map((card, i) => (
                    <div key={card._id}>
                        <br />
                        <Card>
                            <Card.Body>
                                <Card.Title>{card.name}</Card.Title>
                                <Card.Text>{card.description}</Card.Text>
                                <br />
                                <Card.Subtitle>Comments:</Card.Subtitle>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Cras justo odio</ListGroupItem>
                                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                                <ListGroupItem>Vestibulum at eros</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Button variant="secondary" data-key={card._id} onClick={this.handleCardModalShow}><IoMdCreate /> edit</Button>&nbsp;
                                <Button variant="warning" data-key={card._id} onClick={this.handleMoveModalShow}><IoIosMove /> move</Button>&nbsp;
                                <Button variant="info" data-key={card._id} onClick={this.handleCommentModalShow}><IoIosChatboxes /> comment</Button>&nbsp;
                                <Button variant="danger" data-key={card._id}><IoIosCloseCircleOutline /> delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}

                {/* Card Modal  */}
                <Modal show={this.state.show} onHide={this.handleCardModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a card</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    </Modal.Body>
                </Modal>

                {/* Move Modal  */}
                <Modal show={this.state.moveModal} onHide={this.handleMoveModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Move card to other list</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGridState">
                                <Form.Label>Choose list</Form.Label>
                                <Form.Control as="select">
                                    <option>List 1</option>
                                    <option selected>List 2</option>
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="submit">Move</Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Comment Modal  */}
                <Modal show={this.state.commentModal} onHide={this.handleCommentModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formGridState">
                                <Form.Control type="text" placeholder="Normal text" />
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
