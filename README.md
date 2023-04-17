import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate, Link , useParams} from 'react-router-dom';
import {useTheme} from '@mui/material/styles';
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from '../../components/Header';
import { tokens } from '../../theme';

const AddFaq = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const enqueueSnackbar = useSnackbar();
    const colors = tokens(theme.palette.mode)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/v1/faq/faqCateList`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((res)=>{
            setCategories(res.data.data);
            console.log(res.data.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])
 
    const handleSubmit = (values) => {
        setLoading(true);
        axios.post(`http://localhost:5000/api/v1/faq/faqAdd`,{
            title: values.title,
            description: values.description,
            parent_cate_id: values.category
        },{
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((res)=>{
            setLoading(false);
            setSuccess(true);
            navigate('/faqs/faqlist');
            enqueueSnackbar('Faq added successfully', {variant: 'success'});
        }).catch((err)=>{
            setLoading(false);
            setError(true);
            enqueueSnackbar('Something went wrong', {variant: 'error'});
        })
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
                        }}>
                            <Box sx={{
                                backgroundColor: colors.white,
                                borderRadius: 1,
                                boxShadow: 5,
                                width: isMobile ? '100%' : '50%',
                            }}
                            >
                                <Formik
                                    initialValues={{
                                        title: '',
                                        description: '',
                                        category: ''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        title: Yup.string().max(255).required('Title is required'),
                                        description: Yup.string().max(255).required('Description is required'),
                                        category: Yup.string().max(255).required('Category is required'),
                                    })}
                                    onSubmit={(values) => {
                                        handleSubmit(values)
                                    }}
                                    >
                                    {({
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        isSubmitting,
                                        touched,
                                        values
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Card>
                                                <Box m="15px 0 0 15px">
                                                    <Header subtitle={"Add Faq"} title={"Faq"} />
                                                </Box>
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
                                                                error={Boolean(touched.title && errors.title)}  
                                                                fullWidth
                                                                helperText={touched.title && errors.title}
                                                                label="Title"
                                                                name="title"
                                                                size='small'
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.title}
                                                                variant="outlined"
                                                                />
                                                        </Grid>
                                                        <Grid
                                                            item    
                                                            md={12}
                                                            xs={12}
                                                            >
                                                            <TextField
                                                                error={Boolean(touched.description && errors.description)}  
                                                                fullWidth
                                                                helperText={touched.description && errors.description}
                                                                label="Description"
                                                                name="description"
                                                                size='small'
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.description}
                                                                variant="outlined"
                                                                />
                                                        </Grid>
                                                        <Grid
                                                            item    
                                                            md={12}
                                                            xs={12}
                                                            >
                                                                <TextField
                                                                    error={Boolean(touched.category && errors.category)}    
                                                                    fullWidth
                                                                    helperText={touched.category && errors.category}
                                                                    label="Category"
                                                                    name="category"
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    select
                                                                    size='small'
                                                                    SelectProps={{ native: true }}
                                                                    value={values.category}
                                                                    variant="outlined"
                                                                    InputLabelProps={{  shrink: true }}
                                                                    >
                                                                        <option value="">Select Category</option>
                                                                        {categories.map((option) => (
                                                                            <option key={option._id} value={option._id}>
                                                                                {option.name}
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
                                                            p: 2
                                                        }}
                                                        >
                                                            <Button
                                                                color="primary" 
                                                                variant="contained"
                                                                type="submit"
                                                                >
                                                                Add Faq
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

export default AddFaq
