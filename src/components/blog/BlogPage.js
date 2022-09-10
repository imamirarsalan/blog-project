import React from 'react';
import Loader from '../shared/Loader';
import { useQuery } from '@apollo/client';
import { GET_BLOG_INFO } from '../../graphql/queris';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import sanitizeHtml from "sanitize-html";
import CommentForm from '../comment/CommentForm';
import Comments from '../comment/Comments';



const BlogPage = () => {
   const { slug } = useParams();
   const navigate = useNavigate()
   const { loading, data, error } = useQuery(GET_BLOG_INFO, {
      variables: { slug }
   });
   if (loading) return <Loader />
   if (error) return <h3>Error...</h3>

   return (
      <Container maxWidth="lg">
         <Grid container>
            <Grid item xs={12} mt={9} display="flex">
               <Typography
                  component="h2"
                  variant="h4"
                  fontWeight={700}
                  color="primary"
                  flex="1"
               >
                  {data.post.title}
               </Typography>
               <ArrowBackRoundedIcon cursor="pointer" onClick={() => navigate(-1)} />
            </Grid>
            <Grid item xs={12} mt={4}>
               <img
                  src={data.post.coverPhoto.url}
                  alt={slug}
                  width="100%"
                  style={{ borderRadius: 15 }}
               />
            </Grid>
            <Grid item xs={12} mt={7} display="flex" alignItems="center">
               <Avatar
                  src={data.post.author.avatar.url}
                  sx={{ width: 100, height: 100, marginLeft: 2 }}
               />
               <Box component="div">

                  <Typography
                     component="p"
                     variant="p"
                     fontWeight={700}
                     mt={3}>
                     {data.post.author.name}
                  </Typography>
                  <Typography
                     component="p"
                     variant="p"
                     color="text.secondary"
                  >
                     {data.post.author.field}
                  </Typography>
               </Box>
            </Grid>
            <Grid item xs={12} mt={5}>
               <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.post.content.html) }}>

               </div>
            </Grid>
            <Grid item xs={12}>
               <CommentForm slug={slug} />

            </Grid>
            <Grid item xs={12}>
               <Comments slug={slug} />

            </Grid>


         </Grid>

      </Container>
   );
};

export default BlogPage;