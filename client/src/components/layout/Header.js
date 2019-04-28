import React, {Component} from 'react';
import {Navbar, Container} from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar bg="dark"  variant="dark">
                <Container>
                <Navbar.Brand>
                    <h1>Trello Clone</h1> <small>by Anu</small>
                </Navbar.Brand>
                </Container>
            </Navbar>
        );
    }
};

export default Header;