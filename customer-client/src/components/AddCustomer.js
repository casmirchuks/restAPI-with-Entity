import {  TextField , Box,Card, CardContent, Typography} from '@mui/material'
import React, { useState, useEffect } from 'react'
import Center from './Center'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function AddCustomer() {

  //state for add new customer
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");

  //state for edit customer
  const [editFirstName, setEditFirstname] = useState("");
  const [editLastName, setEditLastname] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");
  const [editDateOfBirth, setEditDateOfBirth] = useState("");
  const [editAge, setEditAge] = useState("");


  const [Customer, setCustomer] = useState([]);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const customerData = [
    {
        FirstName : 'John',
        LastName : 'Doe',
        EmailAddress : 'johnDoe@gmail.com',
        dateOfBirth: "1993-02-02",
        age: 18,
        IsDeleted: 0
    },
    {
        FirstName : 'John',
        LastName : 'Doe22',
        EmailAddress : 'johnDoe@gmail.com',
        dateOfBirth: "1993-05-07",
        age: 14,
        IsDeleted: 0
    }
  ]

  useEffect(() => {
    setCustomer(customerData)
  }, [])

  const url = "https://localhost:7184/api/customers";

  const getCustomerData = () => {
    axios.get(url)
    .then((responseData) => {
      setCustomer(responseData.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }


  const handleEdit = (id) => {
    handleShow();
  }

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this customer?") == true){
      alert(id)
    }
   
  }

  const handleSubmit = (e) => {

    const customerData = {
      FirstName : 'John',
      LastName : 'Doe',
      EmailAddress : 'johnDoe@gmail.com',
      dateOfBirth: "1993-02-02",
      age: 18,
      IsDeleted: false
    }

    axios.post(`${url}`, customerData)
    .then((json) => {
      alert(JSON.stringify(json))
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleSave = () => {
    const url = "https://localhost:7184/api/customers";
    const cusData = {
      "firstName": firstName,
      "lastName": lastName,
      "emailAddress": emailAddress,
      "dateOfBirth": dateOfBirth,
      "age": 76
    }
    axios.post(url, cusData)
    .then((result)=>{
      getCustomerData();
    })
  }

  const clear = () => {
    setFirstname('');
    setLastname('');
    setEmailAddress('')
  }


  return (
    <Center>

    <Card sx={{width:'400'}}>
      <CardContent sx={{textAlign: 'center'}}>
        <Container>
          <Typography variant='h3' sx={{my:2}}>
            Add Customer
          </Typography>
          <Row>
            <Col>
            <input type='text'
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            className='form-control' 
            placeholder='Enter first name' />
            </Col>
            <Col>
            <input type='text'
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            className='form-control' placeholder='Enter last name' />
            </Col>
            <Col>
            <input type='text'
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className='form-control' 
            placeholder='Enter email address'/>
            </Col>
            <Col>
            <input type='text'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className='form-control' placeholder='Enter age'/></Col>
            <Col>
            <button  className='btn btn-primary'>Submit</button>
            </Col>
          </Row>
        </Container>
      </CardContent>
    </Card>

    <Card sx={{width:'400'}}>
      <CardContent sx={{textAlign: 'center'}}>
        <Typography variant='h3' sx={{my:2}}>
          Display Customer
        </Typography>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>EmailAddress</th>
              <th>Date Of Birth</th>
              <th>Age</th>
              <th>IsDeleted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              customerData && customerData.length > 0 ?
              customerData.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.FirstName}</td>
                    <td>{item.LastName}</td>
                    <td>{item.EmailAddress}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.age}</td>
                    <td>{item.IsDeleted}</td>
                    <td colSpan={2}>
                      <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button>
                      <button className='btn btn-danger' onClick={()=> handleDelete(item.id)}>Delete</button>
                    </td>
                </tr>
                )
              })

              :
              'Loading...'
            }
        
          </tbody>
        </Table>
        <Modal size='lg' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
          <Row>
          <Col>
            <input type='text'
            value={editFirstName}
            onChange={(e) => setEditFirstname(e.target.value)}
            className='form-control' 
            placeholder=' first name' />
            </Col>
            <Col>
            <input type='text'
            value={editLastName}
            onChange={(e) => setEditLastname(e.target.value)}
            className='form-control' placeholder=' last name' />
            </Col>
            <Col>
            <input type='text'
            value={editEmailAddress}
            onChange={(e) => setEditEmailAddress(e.target.value)}
            className='form-control' 
            placeholder=' email address'/>
            </Col>
            <Col>
            <input type='text'
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
            className='form-control' placeholder=' age'/></Col>
            <Col>
            <button  className='btn btn-primary'>Submit</button>
            </Col>
          </Row>
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>

        </Modal>
      </CardContent>
    </Card>
    
    </Center>
  )
}
