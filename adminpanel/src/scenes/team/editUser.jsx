import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const EditUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [status, setStatus] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/user/getUser/?userId=${id}`,{
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }
        }
        );
        setUser(response.data.data);
        setFName(response.data.data.firstName);
        setLName(response.data.data.lastName);
        setEmail(response.data.data.email);
        setUserName(response.data.data.userName);
        setStatus(response.data.data.status);
        setMobile(response.data.data.mobile);
        setRole(response.data.data.role);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
      }
    };
    getUser();
  }, [id, enqueueSnackbar]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users/roles/all",{
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          }

        });
        setRoles(response.data.data);
        console.log(response.data.data)
        setLoadingRoles(false);
      } catch (err) {
        setLoadingRoles(false);
        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        }); 
      }
    };
    getRoles();
  },[enqueueSnackbar] );

  if (loading) {
    return (
      <Box 
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingEdit(true);
    try {
      await axios.put(`http://localhost:5000/api/v1/user/updateUser/?userId=${id}`, {
        userName: userName,
        email: email,
        role: role,
        firstName: fName,
        lastName: lName,
        status: status,
        mobile: mobile,
      },{
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      });
      setLoadingEdit(false);
      enqueueSnackbar("User updated successfully", {
        variant: "success",
      });
      navigate("/team", { replace: true });
    } catch (err) {
      setLoadingEdit(false);
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
      });
    }
  };

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
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              borderRadius: 1,
              boxShadow: 1,
              p: 3,
              width: isDesktop ? "95%" : "100%",
            }}
          >
            <form>
              <Header title={"Edit User"} subtitle={"Update Existing User"} />
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
                
                  fullWidth
                  label="First Name"
                  name="fitstName"
                  onChange={(e) => setFName(e.target.value)}
                  value={fName}
                  variant="outlined"
                  margin="normal"
                  sx={{ gridColumn: "span 2" }}
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  onChange={(e) => setLName(e.target.value)}
                  value={lName}
                  variant="outlined"
                  margin="normal"
                  sx={{ gridColumn: "span 2" }}
                  required
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
                  fullWidth
                  label="User Name"
                  name="userName"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                  margin="normal"
                  variant="outlined"
                  sx={{ gridColumn: "span 2" }}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  variant="outlined"
                  margin="normal"
                  sx={{ gridColumn: "span 2" }}
                  required
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
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  onChange={(e) => setMobile(e.target.value)}
                  value={mobile}
                  margin="normal"
                  variant="outlined"
                  sx={{ gridColumn: "span 2" }}
                  required
                />
                <TextField
                  fullWidth
                  type="file"
                  label="Upload Image"
                  name="image"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
                  margin="normal"
                  variant="outlined"
                  sx={{ gridColumn: "span 2" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  
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
                  fullWidth
                  label="Status"
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  margin="normal"
                  variant="outlined"
                  sx={{ gridColumn: "span 2" }}
                  select
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
                <FormControl
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ gridColumn: "span 2" }}
                  select
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"  
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                  >
                    {roles.map((role) => (
                      <MenuItem  key={role._id} value={role._id}>{role.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box 
              display={isNonMobile ? "flex" : "block"}
              justifyContent="space-between"
              sx={{ py: 2 }}>
                <Button
                  color="success"
                  disabled={loading}
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  {loading ? "Loading..." : "Update"}
                </Button>
                <Button
                  color="error"
                  size="large"
                  type="submit"
                  variant="contained"
                  
                  onClick={() => navigate("/team", { replace: true })}
                >
                  Cancel
                </Button>

              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EditUser;
