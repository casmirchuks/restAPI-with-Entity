import {Card, CardContent, Typography} from '@mui/material'
import React, { useState, useEffect, Fragment } from 'react'
import Center from './Center'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
export default function AddCustomer() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //state for add new customer
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState(0);
  const [dateCreated, setDateCreated] = useState("");
  const [dateEdited, setDateEdited] = useState("");
  const [IsDeleted, setIsDeleted] = useState(0);

  //state for edit customer
  const [editID, setEditID] = useState("");
  const [editFirstName, setEditFirstname] = useState("");
  const [editLastName, setEditLastname] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editEmailAddress, setEditEmailAddress] = useState("");
  const [editDateOfBirth, setEditDateOfBirth] = useState("");
  const [editAge, setEditAge] = useState(0);
  const [editDateCreated, setEditDateCreated] = useState("");
  const [editDateEdited, setEditDateEdited] = useState("");
  const [editIsDeleted, setEditIsDeleted] = useState(0);



  const [data, setData] = useState([]);
  
  useEffect(() => {
  getData()
  }, [])

  //get customer 
  const getData = () => {
    const url = "https://localhost:7184/api/customers";
    axios.get(url)
    .then((result) => {
      setData(result.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  //edit customer
  const handleEdit = (customerId) => {
    handleShow();
    axios.get(`https://localhost:7184/api/customers/${customerId}`)
    .then((result) => {
      setEditFirstname(result.data.firstName);
      setEditLastname(result.data.lastName);
      setEditUserName(result.data.userName);
      setEditEmailAddress(result.data.emailAddress);
      setEditDateOfBirth(result.data.dateOfBirth);
      setEditAge(result.data.age);
      setEditDateCreated(result.data.dateCreated);
      setEditDateEdited(result.data.dateEdited);
      setEditIsDeleted(result.data.isDeleted);
      setEditID(customerId);
    })
    .catch((error) => {
      toast.error(error)
    })
  }

  //deletes a customer
  const handleDelete = (customerId) => {
    if(window.confirm("Are you sure you want to delete this customer?") === true){
      axios.delete(`https://localhost:7184/api/customers/${customerId}`)
      .then((result) => {
        if(result.status === 200) {
          toast.success("Customer has been deleted")
          getData();
        }
      })
      .catch((error) => {
        toast.error(error)
      })
    }
   
  }

  //update customer
  const handleUpdate = () => {
    const url = `https://localhost:7184/api/customers/${editID}`
    const data = {
      "customerId": editID,
      "firstName": editFirstName,
      "lastName": editLastName,
      "userName": editUserName,
      "emailAddress":editEmailAddress,
      "dateOfBirth": editDateOfBirth,
      "age": editAge,
      "dateCreated": editDateCreated,
      "dateEdited": editDateEdited,
      "isDeleted": editIsDeleted
    }
    axios.put(url, data)
    .then((result)=>{
      handleClose()
      getData();
      clear();
      toast.success("Customer has been Updated")
    }).catch((error) => {
      toast.error(error)
    })
  }

  //adds a new customer
  const handleSave = () => {
    const url = "https://localhost:7184/api/customers";
    const data = {
      "firstName": firstName,
      "lastName": lastName,
      "userName": userName,
      "emailAddress":emailAddress,
      "dateOfBirth": dateOfBirth,
      "age": age,
      "dateCreated": dateCreated,
      "dateEdited": dateEdited,
      "isDeleted": IsDeleted
    }
    axios.post(url, data)
    .then((result)=>{
      getData();
      clear();
      toast.success("Customer has been added")
    }).catch((error) => {
      toast.error(error)
    })
  }

  const clear = () => {
    setFirstname('');
    setLastname('');
    setUserName('');
    setEmailAddress('');
    setDateOfBirth('');
    setAge('');
    setDateCreated('');
    setDateEdited('');
    setIsDeleted(0);


    setEditIsDeleted(0);
  }

  const handleDeleteChange = (e) => {
    if(e.target.checked){
      setIsDeleted(1)
    } else 
    setIsDeleted(0)
  }

  const handleEditDeleteChange = (e) => {
    if(e.target.checked){
      setEditIsDeleted(1)
    } else 
    setEditIsDeleted(0)
  }

  return (
    <Fragment>
 <ToastContainer />
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
            placeholder=' first name' />
            </Col>
            <Col>
            <input type='text'
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            className='form-control' placeholder=' last name' />
            </Col>
         
            <Col>
            <input type='text'
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className='form-control' 
            placeholder=' email address'/>
            </Col>
            <Col>
            <input type='text'
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className='form-control' placeholder='date of birth'/>
            </Col>
            <Col>
            <input type="checkbox"
            value={IsDeleted}
            checked={IsDeleted === 1 ? true : false}
            onChange={(e) => handleDeleteChange(e)}
             />
             <label>IsDeleted</label>
            </Col>
            <Col>
            <button  className='btn btn-primary'
            onClick={() => handleSave()}
            >Submit</button>
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
              <th>User Name</th>
              <th>EmailAddress</th>
              <th>Date Of Birth</th>
              <th>Age</th>
              <th>Date Created</th>
              <th>Date Edited</th>
              <th>IsDeleted</th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.length > 0 ?
              data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.userName}</td>
                    <td>{item.emailAddress}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.age}</td>
                    <td>{item.dateCreated}</td>
                    <td>{item.dateEdited}</td>
                    <td>{item.isDeleted}</td>
                    <td colSpan={2}>
                      <button className="btn btn-primary" onClick={()=> handleEdit(item.customerId)}>Update</button>
                      <button className='btn btn-danger' onClick={()=> handleDelete(item.customerId)}>Delete</button>
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
          <Card sx={{width:'300'}}>

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
            placeholder=' email '/>
            </Col>
            <Col>
            <input type='text'
            value={editDateOfBirth}
            onChange={(e) => setEditDateOfBirth(e.target.value)}
            className='form-control' placeholder='date of birth'/>
            </Col>
         
            <Col>
            <input type="checkbox"
            value={editIsDeleted}
            checked={editIsDeleted === 1 ? true : false}
            onChange={(e) => handleEditDeleteChange(e)}
             />
             <label>IsDeleted</label>
            
            </Col>
          
</Card>
       
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>

        </Modal>
      </CardContent>
    </Card>
    
    </Center>
    </Fragment>
   
  )
}
