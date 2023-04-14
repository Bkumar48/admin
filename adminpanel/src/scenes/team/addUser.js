import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  TextareaAutosize,
  ImageList,
  FormControl,
  FilledInput,
  ButtonBase,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Form from "react-bootstrap/Form";

const AddUser = () => {
  const ref = useRef();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState({});
  const [roleList, setRoleList] = useState([]);
  const [attachment, setAttachment] = useState(null);
  // const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const token = sessionStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const bodyParameters = {
    key: "value",
  };
  const handleAddUser = (values) => {
    setLoading(true);

    axios
      .post(
        "http://localhost:5000/api/v1/user/register",
        {
          firstName: fName,
          lastName: lName,
          email: email,
          mobile: mobile,
          password: password,
          roles: roles,
          status: status,
        },
        config,
        bodyParameters
      )
      .then((res) => {
        setSuccess(res.data);
        setLoading(false);
        enqueueSnackbar("User Created successfully", { variant: "success" });
        setTimeout(() => {
          navigate("/blogs");
        }, 500);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
        setTimeout(() => {}, 1000);
      });
  };

  useEffect(() => {
    const getRoles = async () => {
      const res = await axios.get("http://localhost:5000/api/roles/all");

      setRoleList(res.data);
    };
    getRoles();
  }, []);

  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundColor: colors.background,
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            pl:10,
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 5,
              p: 3,
              width: isMobile ? "100%" : "50%",
            }}
          >
            <Formik
              initialValues={{
                fName: "",
                lName: "",
                email: "",
                mobile: "",
                password: "",
                confirmPassword: "",
                roles: "",
                status: "",
              }}
              validationSchema={Yup.object().shape({
                fName: Yup.string()
                  .max(255)
                  .required("First name is required"),
                lName: Yup.string()
                  .max(255)
                  .required("Last name is required"),
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                mobile: Yup.string()
                  .max(255)
                  .required("Mobile number is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
                confirmPassword: Yup.string()
                  .required("Confirm Password is Required")
                  .oneOf([Yup.ref("password"), null], "Passwords must match"),
              })}
              onSubmit={handleAddUser}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Header title="Add User" subtitle="Add a new Users here" />

                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      error={Boolean(touched.fName && errors.fName)}
                      fullWidth
                      size="small"
                      helperText={touched.fName && errors.fName}
                      label="First Name"
                      margin="normal"
                      name="fName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fName}
                      variant="outlined"
                      sx={{ gridColumn: "span 2" }}
                      required={true}
                    />
                    <TextField
                      error={Boolean(touched.lName && errors.lName)}
                      fullWidth
                      size="small"
                      helperText={touched.lName && errors.lName}
                      label="Last Name"
                      margin="normal"
                      name="lName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lName}
                      variant="outlined"
                      sx={{ gridColumn: "span 2" }}
                      required={true}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      size="small"
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                      sx={{ gridColumn: "span 2" }}
                      required={true}
                    />

                    <TextField
                      error={Boolean(touched.mobile && errors.mobile)}
                      fullWidth
                      size="small"
                      helperText={touched.mobile && errors.mobile}
                      label="Mobile Number"
                      margin="normal"
                      name="mobile"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobile}
                      variant="outlined"
                      sx={{ gridColumn: "span 2" }}
                      required={true}
                    />
                  </Box>
                  <Box>
                    
                    <TextField
                      type="file"
                      fullWidth
                      multiple
                      size="small"
                      label="Upload Image"
                      variant="outlined"
                      margin="normal"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.image}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ gridColumn: "span 2" }}
                      disabled
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      size="small"
                      helperText={touched.password && errors.password}
                      label="Password"
                      required={true}
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      error={Boolean(
                        touched.confirmPassword && errors.confirmPassword
                      )}
                      fullWidth
                      size="small"
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                      label="Confirm Password"
                      margin="normal"
                      name="confirmPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.confirmPassword}
                      variant="outlined"
                      sx={{ gridColumn: "span 2" }}
                      required={true}
                    />
                  </Box>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      error={Boolean(touched.roles && errors.roles)}
                      fullWidth
                      size="small"
                      helperText={touched.roles && errors.roles}
                      label="Roles"
                      margin="normal"
                      name="roles"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.roles}
                      variant="outlined"
                      sx={{ gridColumn: "span 2" }}
                      select
                    >
                      {roleList.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      error={Boolean(touched.status && errors.status)}
                      fullWidth
                      size="small"
                      helperText={touched.status && errors.status}
                      label="Status"
                      margin="normal"
                      name="status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.status}
                      variant="outlined"
                      sx={{ gridColumn: "span 2" }}
                      select
                    >
                      <MenuItem key="Active" value="Active">
                        Active
                      </MenuItem>
                      <MenuItem key="Inactive" value="Inactive">
                        Inactive
                      </MenuItem>
                    </TextField>
                  </Box>

                  <Box sx={{ py: 2 }}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {isSubmitting ? "Loading" : "Add user"}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AddUser;
