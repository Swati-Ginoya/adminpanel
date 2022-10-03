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
import { add_Patient, delete_Patient, Get_Patient, update_Patients } from '../../redux/action/patient.action';
import { useDispatch, useSelector } from 'react-redux';


function Patient(props) {
  const [open, setOpen] = React.useState(false);
  const [dopen, setDOpen] = React.useState(false);
  const [did, setDid] = useState(0);
  const [update, setUpdate] = useState(false)
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
    setUpdate(false);
    formikObj.resetForm();
  }

  const handleUpdate = (values) => {


    dispatch(update_Patients(values));

    loadData();
    formikObj.resetForm();
    handleClose()

  }

  const handleEdit = (params) => {
    setUpdate(true)

    handleClickOpen()

    formikObj.setValues(params.row)
  }

  let schema = yup.object().shape({
    name: yup.string().required("Enter patient name"),
    gender: yup.string().required("Enter patient gender"),
    disease: yup.string().required("Enter patient disease"),
    fees: yup.number().required("Enter medical fees"),
    date: yup.string().required("Enter appointment date")
  });

  const insertData = (values) => {

    dispatch(add_Patient(data));

    loadData();
    formikObj.resetForm();
    handleClose()
  }

  const formikObj = useFormik({
    initialValues: {
      name: '',
      gender: '',
      disease: '',
      fees: '',
      date: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      console.log(values);


      {
        if (update) {
          handleUpdate(values);
        } else {
          insertData(values);
        }
      }
    },
  });

  const handleDelete = () => {
    // let localData = JSON.parse(localStorage.getItem("patient"))
    // let fData = localData.filter((d) => d.id !== did)
    // localStorage.setItem("patient", JSON.stringify(fData))

    dispatch(delete_Patient(did));
    loadData();
    handleClose()
  }
  const columns = [
    { field: 'name', headerName: 'Patient Name', width: 170 },
    { field: 'gender', headerName: 'Patient Gender', width: 170 },
    { field: 'disease', headerName: 'Patient Disease', width: 170 },
    { field: 'fees', headerName: 'Medical Fees', width: 170 },
    { field: 'date', headerName: 'Appointment date', width: 170 },
    {
      field: 'action',
      headerName: 'Action',
      width: 170,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
            <DeleteIcon />
          </IconButton>

        </>
      )
    }
  ];

  useEffect(() => {
    // loadData();

    dispatch(Get_Patient(data));
  }
    , [])

  const dispatch = useDispatch();

  const Patient = useSelector(state => state.patient)

  const loadData = () => {

    let localData = JSON.parse(localStorage.getItem('patient'))

    if (localData !== null) {
      setData(localData)
    }
  }
  const { handleBlur, handleChange, errors, handleSubmit, touched, values } = formikObj

  return (
    <div>
      {
        Patient.isloading ?
          <p>loading ....</p>
          :
          Patient.error !== '' ?
            <p>{Patient.error}</p>
            :
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Patient Detail
              </Button>

              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={Patient.patient}
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
                {
                  update ?
                    <DialogTitle>Update Patient Form</DialogTitle>
                    :
                    <DialogTitle>Fill Patient Form</DialogTitle>
                }
                <Formik values={formikObj}>
                  <Form onSubmit={handleSubmit}>
                    <DialogContent>
                      <TextField
                        value={values.name}
                        margin="dense"
                        name="name"
                        label="Patient Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                      <TextField
                        value={values.gender}
                        margin="dense"
                        name="gender"
                        label="Patient Gender"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.gender && touched.gender ? <p>{errors.gender}</p> : ''}
                      <TextField
                        value={values.disease}
                        margin="dense"
                        name="disease"
                        label="Disease"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.disease && touched.disease ? <p>{errors.disease}</p> : ''}
                      <TextField
                        value={values.fees}
                        margin="dense"
                        name="fees"
                        label="Fees"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.fees && touched.fees ? <p>{errors.fees}</p> : ''}
                      <TextField
                        value={values.date}
                        margin="dense"
                        name="date"
                        label=""
                        type="date"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.date && touched.date ? <p>{errors.date}</p> : ''}
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        {
                          update ?

                            <Button type='submit'>Update</Button>
                            :
                            <Button type='submit'>Submit</Button>
                        }
                      </DialogActions>
                    </DialogContent>
                  </Form>
                </Formik >

              </Dialog>

            </div >
      }
    </div>

  );
}

export default Patient;