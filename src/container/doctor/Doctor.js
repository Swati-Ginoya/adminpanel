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
import { add_doctor, delete_doctor, get_Doctor, update_doctor } from '../../redux/action/Doctor.action';


function Doctor(props) {
  const [open, setOpen] = React.useState(false);
  const [dopen, setDOpen] = React.useState(false);
  const [did ,setDid] = useState(0);
  const [update ,setUpdate] = useState(false)
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

  const handleUpdate = (values) =>{
    // let localData = JSON.parse(localStorage.getItem("doctor"))

    // let uData = localData.map((d) => {
    //   if (d.id === values.id) {
    //     return values;
    //   } else {
    //     return d;
    //   }
    // })

    // localStorage.setItem("doctor", JSON.stringify(uData));

   
    dispatch(update_doctor(values))

    loadData();
    formikObj.resetForm();
    handleClose()

  }

  const handleEdit = (params) =>{
   setUpdate(true)

    handleClickOpen()
 
    formikObj.setValues(params.row)
  }

  let schema = yup.object().shape({
    name: yup.string().required("Enter doctor name"),
    designation: yup.string().required("Enter doctor designation"),
    department: yup.string().required("Enter doctor department"),
    salary: yup.number().required("Enter doctor salary"),
    qualification: yup.string().required("Enter doctor qualification")
  });

  const insertData = (values) => {
    // let localData = JSON.parse(localStorage.getItem('doctor'));

    let id = Math.floor(Math.random() * 1000);

    let data = {
      id: id,
      ...values
    }

    // console.log(data);

    // if (localData === null) {
    //   localStorage.setItem("doctor", JSON.stringify([data]));
    // } else {
    //   localData.push(data);
    //   localStorage.setItem("doctor", JSON.stringify(localData));
    // }

    dispatch (add_doctor(data))

    loadData();
    formikObj.resetForm();
    handleClose()
  }

  const formikObj = useFormik({
    initialValues: {
      name: '',
      designation:'',
      department: '',
      salary: '',
      qualification: ''
    },
    validationSchema: schema,
    onSubmit: values => {
      console.log(values);


      {
        if(update){
          handleUpdate(values);
        }else{
          insertData(values);
        }
      }
    },
  });

  const handleDelete = () => {
    // let localData = JSON.parse(localStorage.getItem("doctor"))
    // let fData = localData.filter((d) => d.id !== did)
    // localStorage.setItem("doctor", JSON.stringify(fData))

    dispatch(delete_doctor(did))
    
    loadData();
    handleClose()
  }
  const columns = [
    { field: 'name', headerName: 'Doctor Name', width: 170 },
    { field: 'designation', headerName: 'Doctor designation', width: 170 },
    { field: 'department', headerName: 'Doctor department', width: 170 },
    { field: 'salary', headerName: 'Doctor salary', width: 170 },
    { field: 'qualification', headerName: 'Doctor qualification', width: 170 },
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
    // loadData();

    dispatch(get_Doctor(data))
  }
    , [])

  const dispatch=useDispatch();

  const Doctor = useSelector(state => state.doctor)
   

  const loadData = () => {

    let localData = JSON.parse(localStorage.getItem('doctor'))

    if (localData !== null) {
      setData(localData)
    }
  }
  const { handleBlur, handleChange, errors, handleSubmit, touched ,values} = formikObj

  return (
    <div>
      {
        Doctor.isloading ?
        <p>loading ....</p>
        :
        Doctor.error !== ''?
        <p>{Doctor.error}</p>
        :
         <div>
         <Button variant="outlined" onClick={handleClickOpen}>
           Doctor Detail
         </Button>
   
         <div style={{ height: 600, width: '100%' }}>
           <DataGrid
             rows={Doctor.doctor}
             columns={columns}
             pageSize={20}
             rowsPerPageOptions={[20]}
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
           <DialogTitle>Update Doctor Form</DialogTitle>
             :
           <DialogTitle>Fill Doctor Form</DialogTitle>
         }
           <Formik values={formikObj}>
             <Form onSubmit={handleSubmit}>
               <DialogContent>
                 <TextField
                 value={values.name}
                   margin="dense"
                   name="name"
                   label="Doctor Name"
                   type="text"
                   fullWidth
                   variant="standard"
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                 <TextField
                 value={values.designation}
                 margin="dense"
                   name="designation"
                   label="Doctor designation"
                   type="text"
                   fullWidth
                   variant="standard"
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                  {errors.designation && touched.designation ? <p>{errors.designation}</p> : ''}
                 <TextField
                 value={values.department}
                 margin="dense"
                   name="department"
                   label="Doctor department"
                   type="text"
                   fullWidth
                   variant="standard"
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {errors.department && touched.department ? <p>{errors.department}</p> : ''}
                 <TextField
                 value={values.salary}
                 margin="dense"
                   name="salary"
                   label="Doctor salary"
                   type="number"
                   fullWidth
                   variant="standard"
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {errors.salary && touched.salary ? <p>{errors.salary}</p> : ''}
                 <TextField
                 value={values.qualification}
                 margin="dense"
                   name="qualification"
                   label="Doctor qualification"
                   type="text"
                   fullWidth
                   variant="standard"
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {errors.qualification && touched.qualification ? <p>{errors.qualification}</p> : ''}
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

export default Doctor;