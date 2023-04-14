import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import { Box, Button, TextField, MenuItem, Checkbox } from "@mui/material";
import { Label } from "reactstrap";

const AddBlogCategory = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [parentCategory, setParentCategory] = useState("");
  const [image, setImage] = useState("");
  const [slug, setSlug] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const fetchCategories = async () => {
    const response = await axios
      .get("http://localhost:5000/api/v1/user/blogcate/getallcate", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (values) => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }
    const query = `category=${values.name}&isSubcategory=${values.isSubcategory}&parentCategory=${values.parentCategory}&image=${values.image}&slug=${values.slug}`;
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/blogcate/addcate",
        query,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      setSuccess(res.data.message);
      enqueueSnackbar("Category created successfully", {
        variant: "success",
      });
      navigate("/blogs");
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          backgroundColor: "colors.background",
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
              backgroundColor: "colors.white",
              borderRadius: 1,
              boxShadow: 1,
              p: 3,
              width: isMobile ? "100%" : "95%",
            }}
          >
            <Formik
              initialValues={{
                name: "",
                isSubcategory: false,
                parentCategory: "",
                image: "",
                slug: "",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .max(255)
                  .required("Name is required"),
                isSubcategory: Yup.boolean(),
                parentCategory: Yup.string().max(255),
                // image: Yup.string().max(255).required('Image is required'),
                // slug: Yup.string().max(255).required('Slug is required')
              })}
              onSubmit={handleAddCategory}
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
                <form onSubmit={handleSubmit}
                >
                  <Header
                    title={"Add Blog Category"}
                    subtitle={`Add a new category for blogs`}
                  />
                  <Box>
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Name"
                      margin="normal"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.name}
                      variant="outlined"
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      error={Boolean(
                        touched.isSubcategory && errors.isSubcategory
                      )}
                      helperText={touched.isSubcategory && errors.isSubcategory}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      margin="normal"
                      name="isSubcategory"
                      value={values.isSubcategory}
                      control={<Switch color="secondary" />}
                      label="Is this a Subcategory?"
                    />
                  </Box>
                  {values.isSubcategory && (
                    <Box>
                    <TextField
                      error={Boolean(
                        touched.parentCategory && errors.parentCategory
                      )}
                      fullWidth
                      helperText={
                        touched.parentCategory && errors.parentCategory
                      }
                      label="Parent Category"
                      margin="normal"
                      name="parentCategory"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      select
                      value={values.parentCategory}
                      variant="outlined"
                    >
                      {categories.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.category}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  )}
                  <Box>
                    <TextField
                      error={Boolean(touched.image && errors.image)}
                      fullWidth
                      helperText={touched.image && errors.image}
                      label="Image"
                      margin="normal"
                      name="image"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="file"
                      value={values.image}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      error={Boolean(touched.slug && errors.slug)}
                      fullWidth
                      helperText={touched.slug && errors.slug}
                      label="Slug"
                      margin="normal"
                      name="slug"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.slug}
                      variant="outlined"
                    />
                  </Box>
                  <Box
                    display={{ xs: "block", sm: "flex" }}
                    justifyContent={{ sm: "space-between" }}
                    sx={{ py: 2 }}
                  >
                    <Button
                      color="success"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <CircularProgress color="inherit" size={"20px"} /> : "Add Category"}
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                      LinkComponent={Link}
                      to="/app/blogs/categories"
                    >
                      Cancel
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

export default AddBlogCategory;
