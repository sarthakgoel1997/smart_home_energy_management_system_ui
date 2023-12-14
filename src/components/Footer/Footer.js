import React from "react";
import { Container, Row, Col } from 'reactstrap';

function Footer() {
    return (
        <footer style={{ position: 'absolute', bottom: 0, height: '60px', backgroundColor: '#212529', padding: '20px', width: '100%' }}>
          <Container>
            <Row>
              <Col style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', color: 'white'}}>
                <p>&copy; Fall 2023 Principles of Database Systems Project. All Rights Reserved.</p>
              </Col>
            </Row>
          </Container>
        </footer>
    );
};

export default Footer;