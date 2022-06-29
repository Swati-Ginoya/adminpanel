import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, Form, Formik } from "formik";
import * as yup from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function Medicine(props) {
  const [open, setOpen] = React.useState(false);
  const [dopen, setDOpen] = React.useState(false);
  const [did ,setDid] = useState(0);
  let [data, setData] = useState([]);

  const handleDClickOpen = () => {
    setDOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
  }

  const handleEdit = (params) =>{
    handleClickOpen()

    formikObj.setValues(params.row)
  }

  let schema = yup.object().shape({
    name: yup.string().required("Enter medicine name"),
    price: yup.number().required("Enter medicine price"),
    quantity: yup.string().required("Enter medicine quantity"),
    expiry: yup.string().required("Enter medicine expiry")
  });

  const insertData = (values) => {
    let localData = JSON.parse(localStorage.getItem('medicine'));

    let id = Math.floor(Math.random() * 1000);

    let data = {
      id: id,
      ...values
    }

    console.log(data);

    if (localData === null) {
      localStorage.setItem("medicine", JSON.stringify([data]));
    } else {
      localData.push(data);
      localStorage.setItem("medicine", JSON.stringify(localData));
    }


    loadData();
    formikObj.resetForm();
    handleClose()
  }

  const formikObj = useFormik({
    initialValues: {
      name: '',
      price: '',
      quantity: '',
      expiry: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      console.log(values);
      insertData(values);
    },
  });

  const handleDelete = () => {
    let localData = JSON.parse(localStorage.getItem("medicine"))
    let fData = localData.filter((d) => d.id !== did)
    localStorage.setItem("medicine", JSON.stringify(fData))
    loadData();
    handleClose()
  }
  const columns = [
    { field: 'name', headerName: 'Medicine Name', width: 170 },
    { field: 'price', headerName: 'Medicine Price', width: 170 },
    { field: 'quantity', headerName: 'Medicine Quantity', width: 170 },
    { field: 'expiry', headerName: 'Medicine Expiry', width: 170 },
    {
      field: 'action',
      headerName: 'Action',
      width: 170,
      renderCell: (params) => (
        <>
        <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
         <EditIcon />
       </IconButton>
        <IconButton aria-label="delete" onClick={() => {handleDClickOpen() ;setDid(params.id)}}>
          <DeleteIcon />
        </IconButton>
         
       </>
      )
    }
  ];

  useEffect(() => {
    loadData();
  }
    , [])

  const loadData = () => {

    let localData = JSON.parse(localStorage.getItem('medicine'))

    if (localData !== null) {
      setData(localData)
    }
  }
  const { handleBlur, handleChange, errors, handleSubmit, touched ,values} = formikObj

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Medicine Form
      </Button>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <Dialog
        open={dopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Fill Your medicine form</DialogTitle>
        <Formik values={formikObj}>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
              value={values.name}
                margin="dense"
                name="name"
                label="Medicine name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? <p>{errors.name}</p> : ''}
              <TextField
              value={values.price}
              margin="dense"
                name="price"
                label="Medicine price"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.price && touched.price ? <p>{errors.price}</p> : ''}
              <TextField
              value={values.quantity}
              margin="dense"
                name="quantity"
                label="Medicine quantity"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
              <TextField
              value={values.expiry}
              margin="dense"
                name="expiry"
                label="Medicine expiry"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type='submit'>Submit</Button>
              </DialogActions>
            </DialogContent>
          </Form>
        </Formik >

      </Dialog>

    </div >
  );
}

export default Medicine;