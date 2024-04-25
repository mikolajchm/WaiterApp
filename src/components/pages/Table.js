import { Container, Row, Col, Form, InputGroup, Spinner, Button } from "react-bootstrap";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editTableRequest, getTablesById } from "../../redux/tablesRedux";
import { getStatus } from "../../redux/statusRedux";
import { useState, useEffect } from "react";

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: tableId } = useParams();
  const tableData = useSelector(state => getTablesById(state, tableId));
  const statusOptions = useSelector(getStatus);
  const [status, setStatus] = useState('');
  const [peopleAmount, setPeopleAmount] = useState('0');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState('');
  const [bill, setBill] = useState('');
  const [showBill, setShowBill] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tableData) {
      setStatus(tableData.status);
      setPeopleAmount(tableData.minpeopleAmount);
      setMaxPeopleAmount(tableData.MaxPeopleAmount);
      setBill(tableData.bill);
      setLoading(false);
    }
  }, [tableData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTableRequest({ id: tableId, status, peopleAmount, maxPeopleAmount, bill }));
    navigate('/');
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (newStatus === 'Busy') {
      setShowBill(true);
      setBill('0');
    } else if (newStatus === 'Cleaning' || newStatus === 'Free') {
      setShowBill(false);
      setPeopleAmount('0');
    } else {
      setShowBill(false);
      setPeopleAmount(tableData.minpeopleAmount);
    }
  };

  const handlePeopleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10 && value < parseInt(maxPeopleAmount)) {
      setPeopleAmount(value.toString());
    }
  };

  const handleMaxPeopleAmountChange = (e) => {
    const value = parseInt(e.target.value);
    const currentPeopleAmount = parseInt(peopleAmount);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setMaxPeopleAmount(value.toString());
      if (currentPeopleAmount > value) {
        setPeopleAmount(value.toString());
      }
    }
  };

  if (loading) {
    return (
      <div className="mt-5 , text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!tableData) return <Navigate to="/" />;

  return (
    <Container>
      <Row>
        <h1 className="pb-2">Table {tableData.id}</h1>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit} className="mb-4">
          <Row className="my-4">
          <Col  xs="1"><b>Status: </b></Col>
          <Col xs="3" sm="3">
            <Form.Select 
              value={status} onChange={handleStatusChange}>
              {statusOptions.map(({ id, name }) => (
                <option key={id} value={name}>{name}</option>
              ))}
            </Form.Select>
          </Col>
          </Row>
          <Row className="mb-4">
            <Col xs="1"><b>People: </b></Col>
            <Col xs="auto">
              <InputGroup>
                <Form.Control style={{ maxWidth: '50px', marginRight: '-30px' }} value={peopleAmount} onChange={handlePeopleAmountChange} />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <InputGroup.Text className="border-0 bg-transparent" >/</InputGroup.Text>
            </Col>
            <Col xs="auto">
              <InputGroup>
                <Form.Control style={{ maxWidth: '50px', marginLeft: '-30px' }} value={maxPeopleAmount} onChange={handleMaxPeopleAmountChange} />
              </InputGroup>
            </Col>
          </Row>
          {(showBill || status === 'Busy') && (
            <Row className="my-2">
              <Col xs="1"><b>Bill: </b></Col>
              <Col xs="auto">
                <InputGroup.Text className="border-0 bg-transparent" style={{ marginRight: '-30px' }}>$</InputGroup.Text>
              </Col>
              <Col xs="auto">
                <InputGroup>
                  <Form.Control style={{ maxWidth: '60px' }} value={bill} onChange={e => setBill(e.target.value)} />
                </InputGroup>
              </Col>
            </Row>
          )}
          <Button type="submit">Update</Button>
        </Form>
      </Row>
    </Container> 
  );
};

export default Table;
