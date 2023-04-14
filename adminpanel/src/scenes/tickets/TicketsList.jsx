import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { Button, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const TicketsList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/v1/ticket/admin/ticketGetAll",
        config
      );
      setTickets(res.data.data);
      setLoading(false);
      console.log(res.data.data);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTickets();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(
        `http://localhost:5000/api/v1/ticket/admin/ticketDelete/${id}`,
        config
      )
      .then((res) => {
        setLoading(false);
        enqueueSnackbar(res.data.message, { variant: "success" });
        fetchTickets();
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Customer", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "status", headerName: "Status", type: "singleSelect", valueOptions:["Open","Closed","On Hold"], width: 150 ,
editable: true,
renderCell: ({row : {status}}) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    width="60%"
    p="5px"
    backgroundColor={
      status === "Open"
        ? colors.greenAccent[600]
        : status === "Closed"
        ? colors.redAccent[600]
        : colors.blueAccent[600]
    }
    borderRadius="4px"
    >
      <Typography color={colors.grey[100]} sx={{ ml:"5px"}}>
        {status}
      </Typography>
      
    </Box>
        
)
  },

    { field: "createdAt", headerName: "Created At", width: 150 },
    { field: "updatedAt", headerName: "Updated At", width: 150 },
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
            component={Link}
            to={`/tickets/viewticket/${params.row._id}`}
          >
            View
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Box
        m="20px 0 0 0"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header title="Tickets" subtitle="Managing the Tickets" />

        <Button
          variant="contained"
          color="success"
          title="Add User"
          size="small"
          component={Link}
          to="/tickets/createticket"
        >
          Add Ticket
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
          rows={tickets}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => {
            setSelected(newSelection.selectionModel);
          }}
          getRowId={(tickets) => tickets._id}
        />
      </Box>
    </Box>
  );
};

export default TicketsList;
