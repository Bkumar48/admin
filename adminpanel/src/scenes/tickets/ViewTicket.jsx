import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Header from "../../components/Header";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import { InputAdornment, IconButton } from "@mui/material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ViewTicket = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ticket, setTicket] = useState([]);
  const [conversation, setConversation] = useState([]);

  const [replyLoading, setReplyLoading] = useState(false);
  const [replyError, setReplyError] = useState("");
  const [replySuccess, setReplySuccess] = useState("");
  const { id } = useParams();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/ticket/admin/ticketGetById?ticketId=${id}`,
        config
      );
      setTicket(res.data.data);
      console.log(res.data.data);
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
        navigate("/app/tickets");
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };

  const handleReply = (id) => {
    setReplyLoading(true);
    axios
      .post(
        `http://localhost:5000/api/v1/ticket/admin/ticketReply/${id}`,
        { conversation },
        config
      )
      .then((res) => {
        setReplyLoading(false);
        setReplySuccess(res.data.message);
        fetchTickets();
      })
      .catch((err) => {
        setReplyLoading(false);
        setReplyError(err.response.data.message);
      });
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
            justifyContent: "start",
            p: "0 0 0 40px",
          }}
        >
          <Box
            sx={{
              backgroundColor: colors.white,
              minHeight: "100%",
              p: 3,
              width: isMobile ? "100%" : "70%",
            }}
          >
            <Card
              sx={{
                borderRadius: 1,
                boxShadow: 10,
              }}
            >
              <CardHeader title="Ticket Details"></CardHeader>
              <Divider />
              <CardContent>
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <Typography variant="h2" color="textPrimary">
                      {ticket.subject}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={1}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      Ticket ID
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      #{ticket.ticketId}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={"0.5px"}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      User
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      {ticket.name}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={"0.5px"}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      Created At
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      {ticket.createdAt}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={"0.5px"}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      Status
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      {ticket.status}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={"0.5px"}>
                  <Grid item md={2} xs={6}>
                    <Typography variant="h6" color="textPrimary">
                      Description
                    </Typography>
                  </Grid>
                  <Grid item md={10} xs={6}>
                    <Typography variant="body1" color="textSecondary">
                      {ticket.query}
                    </Typography>
                  </Grid>
                </Grid>
                <Box
                backgroundColor="#F0F0F0"
                borderRadius={2}>
                {ticket.conversation && ticket.conversation.length > 0 && (
                  <Grid container spacing={2} mt={"20px"}
                  
                  
                  >
                    <Grid item md={2} xs={2}>
                      <Typography variant="h6" color="textPrimary">
                        <AccountCircleIcon
                          sx={{
                            fontSize: 30,
                            color: "#3f51b5",
                            margin: "auto",
                          }}
                        />{ticket.conversation.name}
                      </Typography>
                    </Grid>
                    {/* <Grid item md={10} xs={10}>
                            <Typography variant="body1" color="textSecondary">
                            {ticket.conversation.map((reply) => (
                                <div>
                                <p>{reply}</p>
                                </div>
                            ))}
                            </Typography>
                        </Grid> */}
                  </Grid>
                )}
                </Box>

                <Grid container mt={"100px"}>
                  <Grid item md={1} xs={1}>
                    <AccountCircleIcon
                      sx={{ fontSize: 30, color: "#3f51b5", margin: "auto" }}
                    />
                  </Grid>

                  <Grid item md={11} xs={11}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      size="small"
                      //   label="Reply"
                      name="reply"
                      onChange={(e) => setConversation(e.target.value)}
                      required
                      value={conversation}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => handleReply(ticket._id)}>
                              <SendIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                {/* <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleReply(ticket._id)}
                  >
                    Reply
                  </Button>
                </Box>
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleDelete(ticket._id)}
                  >
                    Delete
                  </Button>
                </Box> */}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ViewTicket;
