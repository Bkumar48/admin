import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const EditBlog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/user/blog/singleBlog?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setSlug(res.data.data.slug);
        setSelectedImage(res.data.data.image);
        // setSelectedAuthor(res.data.data.author.userName);
        setSelectedCategory(res.data.data.category._id);
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, [id]);

  console.log(selectedCategory)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      setSuccess(false);
      await axios.put(
        `http://localhost:5000/api/v1/user/blog/updateBlog?id=${id}`,

        {
          title: title,
          description: description,
          slug: slug,
          image: selectedImage,
          author: selectedAuthor,
          category: selectedCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      enqueueSnackbar("Blog updated successfully", {
        variant: "success",
      });
      navigate("/blogs", { replace: true });
    } catch (error) {
      setLoading(false);
      setError(true);
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/user/blogcate/getallcate",
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        setCategories(res.data.data);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      }
    };
    getCategories();
  }, [enqueueSnackbar]);

  // useEffect(() => {
  //   const getAuthors = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:5000/api/v1/user/all-users",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       setAuthors(res.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAuthors();
  // }, []);

  // useEffect(() => {
  //   const getImages = async () => {
  //     try {
  //       const res = await axios.get("/api/image/all-images");
  //       setImages(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getImages();
  // }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      slug: "",
      image: "",
      author: "",
      category: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .max(255)
        .required("Title is required"),
      description: Yup.string()
        .max(255)
        .required("Description is required"),
      slug: Yup.string()
        .max(255)
        .required("Slug is required"),
      // image: Yup.string().max(255).required('Image is required'),
      author: Yup.string()
        .max(255)
        .required("Author is required"),
      category: Yup.string()
        .max(255)
        .required("Category is required"),
    }),
  });

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
              width: isMobile ? "100%" : "95%",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <Header title={"Edit Blog"} subtitle={"Update Blog details"} />
              </Box>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                required
                value={title}
                variant="outlined"
              />
              <TextField
                rows={4}
                fullWidth
                multiline
                aria-label="description"
                placeholder="Description"
                label="Description"
                margin="normal"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                required
                value={description}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Slug"
                margin="normal"
                name="slug"
                onChange={(e) => setSlug(e.target.value)}
                required
                value={slug}
                variant="outlined"
              />

              {/* <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-outlined-label"
              >
                Image
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
                label="Image"
              >
                {images.map((image) => (
                  <MenuItem key={image._id} value={image._id}>
                    {image.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
              {/* <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Author
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  label="Author"
                >
                  {authors.map((author) => (
                    <MenuItem key={author._id} value={author.userName}>
                      {author.userName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box
                display={isMobile ? "block" : "flex"}
                justifyContent="space-between"
                sx={{ py: 2 }}
              >
                <Button
                  color="success"
                  disabled={loading} 
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={"20px"} />
                  ) : (
                    "Update"
                  )}
                </Button>
                <Link to="/blogs">
                  <Button
                    color="error"
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ ml: 2 }}

                    // href="/blogs"
                  >
                    Cancel
                  </Button>
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default EditBlog;
