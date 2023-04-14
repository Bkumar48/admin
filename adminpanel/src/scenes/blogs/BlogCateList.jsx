import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

const BlogCateList = () => {
    const theme = useTheme();
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const colors = tokens(theme.palette.mode);
    const fetchCategories = async () => {
        try {
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
            setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
            setLoading(false);
        }
    }
   
            
    // useEffect(() => {
    //     setLoading(true);
    //     const getCategories = async () => {
    //         try {
    //             const res = await axios.get(
    //                 "http://localhost:5000/api/v1/user/blogcate/getallcate",
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //                     },
    //                 }
    //             );
    //             setCategories(res.data.data);
    //         } catch (error) {
    //             console.log(error);
    //             enqueueSnackbar(error.message, {
    //                 variant: "error",
    //             });
    //         }
    //     };
    //     getCategories();
    //     setLoading(false);
    // }, []);

    useEffect(() => {
        setLoading(true);
        fetchCategories();
    }, []);



    const handleDelete = (id) => {
        try {
            const deleteCategory = async () => {
                const res = await axios.delete(
                    `http://localhost:5000/api/v1/user/blogcate/deletecate?id=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    }
                }
                );
                enqueueSnackbar(res.data.message, {
                    variant: "success",
                });
                fetchCategories();
            };
            deleteCategory();
        } catch (error) {
            console.log(error);
            enqueueSnackbar(error.message, {
                variant: "error",
            });
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Name", width: 150},
        { field: "parent", headerName: "Parent", width: 150 },
        { field: "slug", headerName: "Slug", width: 150 },
        { field: "status", headerName: "Status", width: 150, },
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",   
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

    const rows = categories.map((category) => {
        return {
            id: category._id,
            name: category.category,
            parent: category.parent,
            slug: category.slug,
            status: category.status,
            action: (
                <div>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(category._id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        };
    });

    

    return (
       <Box m='20px'>
        <Box 
        mb='20px 0 0 0'
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}>
            <Header title={'Blog Categories'} />
            <Link to='/adminpanel/blogcate/add'>
                <Button variant='contained' color='success'>Add Category</Button>
            </Link>
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
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(newSelection) => {
                    setSelected(newSelection.selectionModel);
                }}
            />
        </Box>
         </Box>
    );
};

export default BlogCateList;

