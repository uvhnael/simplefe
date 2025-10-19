import React from 'react';
import { Formik, Form } from 'formik';
import { TextField, Button } from '@mui/material';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .when('$isEdit', {
      is: false,
      then: (schema) => schema.required('Password is required'),
      otherwise: (schema) => schema.optional(),
    }),
});

function UserForm({ initialValues, onSubmit }) {
  const isEdit = !!initialValues.id;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      context={{ isEdit }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
          <TextField
            fullWidth
            name="username"
            label="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && !!errors.username}
            helperText={touched.username && errors.username}
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />

          {!isEdit && (
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
          )}

          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Update' : 'Create'} User
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;