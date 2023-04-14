import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useTheme} from '@mui/material/styles'
import {tokens} from "../../theme"
import { useNavigate,Link,useParams } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header'


const CreateTicket = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const colors = tokens(theme.palette.mode)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [users, setUsers] = useState([])
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [userId, setUserId] = useState("")
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
          axios
            .get("http://localhost:5000/api/v1/user/all-users", {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              setUsers(res.data.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }, []);

    const config = {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
    }

    const id = userId;  

    const handleCreateTicket = (values) => {
        setLoading(true)
        axios.post(`http://localhost:5000/api/v1/ticket/admin/adminticketCreate?userId=${id}`, {
            subject: values.subject,
            query: values.message,
        }, config)
        .then((res) => {
            setLoading(false)
            enqueueSnackbar('Ticket Created Successfully', { variant: 'success' })
            navigate('/ticket/ticketsList', { replace: true })
        })
        .catch((err) => {
            setLoading(false)
            enqueueSnackbar(err.response.data.message, { variant: 'error' })
        }
        )
    }

    return (
        <div>
            <Header />
            <Box
                sx={{
                    backgroundColor: colors.background,
                    minHeight: '100%',
                }}
                >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        p: 3,
                    }}
                    >
                    <Box
                        sx={{
                            backgroundColor: colors.white,
                            borderRadius: 1,
                            boxShadow:5,
                            width: isMobile ? '100%' : '50%',
                        }}
                        >
                        <Formik
                            initialValues={{
                                subject: "",
                                message: "",
                            }}
                            validationSchema={Yup.object().shape({
                                subject: Yup.string().max(255).required('Subject is required'),
                                message: Yup.string().max(255).required('Message is required'),
                                userId: Yup.string().max(255).required('User is required'),
                            })}
                            onSubmit={(values) => {
                                handleCreateTicket(values)
                            }}
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
                                    <Card>
                                        <Box
                                        m="15px 0 0 15px"
                                        >
                                        <Header
                                            subtitle="Create Ticket"
                                            title="Create Ticket"
                                            /></Box>
                                        <Divider />
                                        <CardContent>
                                            <Grid
                                                container
                                                spacing={3}
                                                >
                                                <Grid
                                                    item
                                                    md={12}
                                                    xs={12}
                                                    >
                                                    <TextField
                                                        error={Boolean(touched.subject && errors.subject)}
                                                        fullWidth
                                                        helperText={touched.subject && errors.subject}
                                                        label="Subject"
                                                        name="subject"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.subject}
                                                        variant="outlined"
                                                        />
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={12}
                                                    xs={12}
                                                    >
                                                    <TextField
                                                        error={Boolean(touched.message && errors.message)}
                                                        fullWidth
                                                        helperText={touched.message && errors.message}
                                                        label="Message"
                                                        name="message"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.message}
                                                        variant="outlined"
                                                        />
                                                </Grid>
                                                <Grid
                                                    item
                                                    md={12}
                                                    xs={12}
                                                    >
                                                    <TextField
                                                        error={Boolean(touched.assignedto && errors.assignedto)}
                                                        fullWidth
                                                        helperText={touched.assignedto && errors.assignedto}
                                                        label="User"
                                                        name="userId"
                                                        onBlur={handleBlur}
                                                        onChange={(e)=>{handleChange(e); setUserId(e.target.value)}}
                                                        value={values.userId}
                                                        variant="outlined"
                                                        select
                                                        SelectProps={{ native: true }}
                                                        InputLabelProps={{ shrink: true }}
                                                        >
                                                        <option value="">Select</option>
                                                        {users.map((option) => (
                                                            <option
                                                                key={option._id}
                                                                value={option._id}
                                                                >
                                                                {option.userName}
                                                            </option>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <Divider />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                p: 2,
                                            }}
                                            >
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                                isSubmitting={isSubmitting}
                                                >
                                                {loading ? <CircularProgress/>   : "Create Ticket"}
                                            </Button>
                                        </Box>
                                    </Card>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
            

        </div>

    )
}

export default CreateTicket


