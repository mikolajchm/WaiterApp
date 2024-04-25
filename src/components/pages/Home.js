import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { getAllTables } from '../../redux/tablesRedux';
import { useSelector } from "react-redux";
import { Form, InputGroup } from 'react-bootstrap';

const  Home = () => {
  const tables = useSelector((state) => getAllTables(state));
  return (
    <Container>  
        <Row>
          <h1>All tables</h1>
        </Row>
        <Row>
            <Col className="p-0">
                {tables.map(table => (
                    <Card  key={table.id} className="mb-4 border-0 border-bottom">
                        <Card.Body className="d-flex justify-content-between">
                            <div style={{marginRight: '10px'}}>
                                <Card.Title className="h1" style={{fontSize: '30px'}}>Table {table.id}</Card.Title>
                            </div>
                            <div className="me-auto mx-3 pt-2 align-items-center">
                                <span><b>Status:</b></span> {table.status}
                            </div>  
                            <Link to={`/table/${table.id}`}>
                                    <Button variant="primary">Show more</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </Col>
        </Row>
    </Container>  
            
);
}

export default Home;
