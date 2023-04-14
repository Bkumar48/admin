import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import CreateIcon from "@mui/icons-material/Create";

const FAQList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
        const getCategories = async () => {
            try {
              const res = await axios.get(
                "http://localhost:5000/api/v1/faq/faqCateList",
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
        setLoading(false);
    } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
    }
}
    








  // const fetchCategories = async () => {
  //   setLoading(true);
  //   const token = sessionStorage.getItem("token");
  //   if (!token) {
  //     setError("Token not found in session storage");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const res = await axios.get(
  //       `http://localhost:5000/api/v1/faq/faqCateList`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setCategories(res.data.data);
  //     console.log(res.data.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setError(error.response);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
   try{
    const deleteCategory = async () => {
       await axios.delete(
        `http://localhost:5000/api/v1/faq/deleteFaqCate?category_Id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res)=>{
        const newCategoryList = categories.filter((category) => category.id !== id);
      fetchCategories(newCategoryList);
      enqueueSnackbar("Deleted Successfully", {
        variant: "success",
      });
    })
    };
    deleteCategory();
    }catch(error){
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    }
   }

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Category Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "slug", headerName: "Slug", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
          >
            <Button
              LinkComponent={Link}
              to={`/faq/edit/${params.row.id}`}
              variant="contained"
              color="secondary"
              startIcon={<CreateIcon />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteForeverIcon />}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows = categories.map((category) => {
    return {
      id: category._id,
      name: category.name,
      description: category.description,
      slug: category.slug,
    };
  });


  return (
    <Box m="20px">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          m: "20px 0 0 0",
        }}
      >
        <Header title="FAQ Categories" subtitle="All Categories of FAQs" />
        <Button
          variant="contained"
          color="success"
          LinkComponent={Link}
          to="/faq/add"
        >
          Add Category
        </Button>
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
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default FAQList;
