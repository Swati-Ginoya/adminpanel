import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik, Form, Formik } from "formik";
import * as yup from 'yup';


function Patient(props) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  
  let schema = yup.object().shape({
    name: yup.string().required("Enter patient name"),
    diseases: yup.string().required("Enter patient diseases"),
    fees: yup.string().required("Enter patient fees"),
    date: yup.string().required("Enter patient appointment date")
  });

  const insertData = (values) => {
    let LocalData = JSON.parse(localStorage.getItem("user"));
    console.log(values);

    if (LocalData === null) {
        localStorage.setItem("user", JSON.stringify([values]));
    } else {
        LocalData.push(values);
        localStorage.setItem("user", JSON.stringify(LocalData));
    }
    LocalData();
    formikObj.resetForm();
    handleClose()
}

  const formikObj = useFormik({
    initialValues: {
      name: '',
      diseases: '',
      fees: '',
      date: ''
    },
    validationSchema: schema,
    onSubmit: values => {
        insertData(values);
    },
  });

  const { handleBlur, handleChange, errors, handleSubmit, touched } = formikObj

    return (
        <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Patient form
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <Formik values={formikObj}>
            <Form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
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
            margin="dense"
            name="diseases"
            label="Patient diseases"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.diseases && touched.diseases ? <p>{errors.diseases}</p> : ''}

          <TextField
            margin="dense"
            name="fees"
            label="Patient Fees"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.fees && touched.fees ? <p>{errors.fees}</p> : ''}

          <TextField
            margin="dense"
            name="date"
            label="Appointment Date"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.date && touched.date ? <p>{errors.date}</p> : ''}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
        </Form>
        </Formik>
      </Dialog>
    </div>
    );
}

export default Patient;