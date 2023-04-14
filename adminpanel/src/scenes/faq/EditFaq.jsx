import React, {useEffect, useState} from 'react';
import {useNavigate,useParams,Link} from 'react-router-dom';
import axios from "axios";
import {useSnackbar} from 'notistack';
import {useTheme} from '@mui/material/styles';
import {tokens} from '../../theme';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MenuItem, Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';
import useMediaQuery from "@mui/material/useMediaQuery";
const EditFaq = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {id} = useParams();
    const [faq, setFaq] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFaqCategory, setSelectedFaqCategory] = useState("");
    const [faqCategories, setFaqCategories] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const fetchFaq = async () => {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        if (!token) {
        setError("Token not found in session storage");
        setLoading(false);
        return;
        }
    
        try {
        const res = await axios.get(
            `http://localhost:5000/api/v1/faq/getSinglefaq?faqId=${id}`,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
            }
        );
        setFaq(res.data.dataProduct);
        setTitle(res.data.dataProduct.title);
        setDescription(res.data.dataProduct.description);
        setSelectedFaqCategory(res.data.dataProduct.parent_cate_id);
        setLoading(false);
        } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
        }
    };
    
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
        setLoading(false);
        } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchFaq();
        fetchFaqCategories();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
            setError("Token not found in session storage");
            setLoading(false);
            return;
            }
            const res = await axios.put(
            `http://localhost:5000/api/v1/faq/updateFaq?faqId=${id}`,{
                title: title,
                description: description,
                parent_cate_id: selectedFaqCategory,
            },{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
            );
            enqueueSnackbar("Updated Successfully", {
                variant: 'success',
            });
            navigate('/faqs', { replace: true });
        } catch (error) {
            enqueueSnackbar(error.response, {
                variant: 'error',
            });
        }
    }

    
    // const formik = useFormik({
        
    //     onSubmit: async (e) => {
    //         e.preventDefault(); 
    //     try {
    //         const token = sessionStorage.getItem("token");
    //         if (!token) {
    //         setError("Token not found in session storage");
    //         setLoading(false);
    //         return;
    //         }
    //         const res = await axios.put(
    //         `http://localhost:5000/api/v1/faq/updateFaq?faqId=${id}`,{
    //             title: title,
    //             description: description,
    //             faqCategoryId: selectedFaqCategory,
    //         },{
    //             headers:{
    //                 Authorization: `Bearer ${token}`,
    //             }
    //         }
    //         );
    //         setSuccess(res.data.message);
    //         enqueueSnackbar(res.data.message, {
    //             variant: 'success',
    //         });
    //         navigate('/app/faq', { replace: true });
    //     } catch (error) {
    //         setError(error.response.data.message);
    //         enqueueSnackbar(error.response.data.message, {
    //             variant: 'error',
    //         });
    //     }
    //     }
    // });

    return (
       <div>
        <Header/>
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
            p:3,
            }}
        >
            <Box
            sx={{
                backgroundColor: colors.white,
                borderRadius: 1,
                boxShadow: 5,
                width: isMobile ? '100%' : '50%',
            }}
            >
                <form onSubmit={handleSubmit}>
                    <Card>
                        <Box m="15px 0 0 15px">
                            <Header subtitle={faq.title} title="Edit Faq" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Question"
                                            name="question"
                                            onChange={(e)=>setTitle(e.target.value)}
                                            required
                                            value={title}
                                            variant="outlined"
                                        />
                                        
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Answer"
                                            name="answer"
                                            onChange={(e)=>setDescription(e.target.value)}
                                            required
                                            value={description}
                                            variant="outlined"
                                        />
                                        
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                        
                                            fullWidth
                                            label="Faq Category"
                                            name="faqCategoryId"
                                            onChange={(e)=>setSelectedFaqCategory(e.target.value)}
                                            required
                                            select
                                            SelectProps={{ native: true }}
                                            value={selectedFaqCategory}
                                            variant="outlined"
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        >
                                            {faqCategories.map((option) => (
                                                <option
                                                key={option._id}
                                                value={option._id}
                                                >
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
                                p: 2,
                                }}
                            >
                                <Button 
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Update Faq
                                </Button>
                                </Box>
                        </Box>
                    </Card>
                </form>
            </Box>
        </Box>
        </Box>
        </div>
    );
    };

    export default EditFaq;
