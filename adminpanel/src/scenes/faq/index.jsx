import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import {useNavigate, Link} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import CreateIcon from '@mui/icons-material/Create';


const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [faqs, setFaqs] = useState([]);
  const [faqCategories, setFaqCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const fetchFaqs = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/faq/allFaq`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setFaqs(res.data.proData);
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqCategories = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/faq/faqCateList`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setFaqCategories(res.data.data);
      console.log(res.data.data)
      setLoading(false);
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqCategories();
  }, []);



  const handleDelete = (id) => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    if (!token) {
      setError("Token not found in session storage");
      setLoading(false);
      return;
    }

    try {
      axios.delete(
        `http://localhost:5000/api/v1/faq/deleteFaq/${id}`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setSuccess("FAQ deleted successfully");
      setLoading(false);
      fetchFaqs();
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 110 },
    {
      field: "question",
      headerName: "Question",
      width: 270,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 270,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      type:"singleSelect",
      valueOptions: ["Active", "Inactive"],
      

     renderCell: ({row:{status}}) => (
      <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width="60%"
      p="5px"
      backgroundColor={
        status === "Active"
          ? colors.greenAccent[600]
          : colors.redAccent[600]
      }
      borderRadius={"4px"}
    >
      <Typography
        variant={"body2"}
        color={
          colors.grey[100]} sx={{ textTransform: "capitalize",ml:"5px" }}
      >
        {status}
      </Typography>
    </Box>

      )


    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
        >
        
          <Button
            variant="contained"
            color="success"
            title="Edit"
            size="small"
            LinkComponent={Link}
            to={`/faqs/editfaq/${params.row.id}`}
          >
            <CreateIcon/>Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            title="Delete"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteForeverIcon />Delete
          </Button>
        </Box>
      ),
    },
  ];


  const rows = faqs.map((faq) => {
    const category = faqCategories.find((cat) => cat._id === faq.parent_cate_id);
    return {
      id: faq._id,
      question: faq.title,
      category: category.name,
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
        <Header title="FAQ" subtitle="Frequently Asked Questions Page" />
        <Button
          variant="contained"
          color="success"
          title="Add Question"
          size="small"
          LinkComponent={Link}
          to="/addfaq"
          
        >
          Add Question
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

export default FAQ;
