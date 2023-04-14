import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const Blogs = () => {
  const theme = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const colors = tokens(theme.palette.mode);

  const fetchBlogs = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/user/blog/all-blogs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs(res.data.data); 
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchBlogs();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    axios
      .delete(`http://localhost:5000/api/v1/user/blog/deleteBlog?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSuccess(res.data);
        const newBlogs = blogs.filter((blog) => blog._id !== id);
        setBlogs(newBlogs);
        setLoading(false);
        enqueueSnackbar("Deleted Successfully", { variant: "error" });
        return;
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  const columns = [ 
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "title",
      headerName: "Title",
      width: 130,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 130,
      editable: true,
    },
    {
      field: "image",
      headerName: "Image",
      width: 130,
      // editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
    },
    {
      field: "slug",
      headerName: "Slug",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
          >
            <Link to={`/editblog/${id}`}>
              <Button
                variant="contained"
                color="success"
                title="Edit"
                size="small"
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              title="Delete"
              size="small"
              onClick={() => {
                handleDelete(id);
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows = blogs.map((blog) => {
    return {
      id: blog._id,
      title: blog.title,
      description: blog.description,
      image: blog.image,
      category: blog.category,
      slug: blog.slug,
    };
  });

  return (
    <Box m="20px">
      <Box
        m="20px 0 0 0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="Blogs" subtitle="Managing the Blogs" />
        <Link to="/addblog">
        <Button
          variant="contained"
          color="success"
          title="Add User"
          size="small"
          
        >
          Add Blog
        </Button></Link>
      </Box>
      <Box
        m="5px 0 0 0" 
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Blogs;
