import React, { useState } from 'react';
import './styles.css';
import { Container, Typography, Box, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', company: '', jobTitle: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedContacts = [...contacts];
      updatedContacts[editIndex] = newContact;
      setContacts(updatedContacts);
      setIsEditing(false);
    } else {
      setContacts([...contacts, newContact]);
    }

    setNewContact({ firstName: '', lastName: '', email: '', phoneNumber: '', company: '', jobTitle: '' });
  };

  const handleEdit = (index) => {
    setNewContact(contacts[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  return (
    <Container>
      <Typography variant="h4" style={{alignItems:"center"}} gutterBottom>Contact Management</Typography>

      <Box sx={{ marginBottom: 4 }}>
        <TextField
          label="First Name"
          name="firstName"
          value={newContact.firstName}
          onChange={handleChange}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={newContact.lastName}
          onChange={handleChange}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          value={newContact.email}
          onChange={handleChange}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={newContact.phoneNumber}
          onChange={handleChange}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Company"
          name="company"
          value={newContact.company}
          onChange={handleChange}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Job Title"
          name="jobTitle"
          value={newContact.jobTitle}
          onChange={handleChange}
          required
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isEditing ? 'Update Contact' : 'Add Contact'}
        </Button>
      </Box>

      {/* Contacts Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(index)}
                  sx={{ marginLeft: 1 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default App;
