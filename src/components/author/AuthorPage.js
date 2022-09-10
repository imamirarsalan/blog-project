import React from 'react';

import Loader from '../shared/Loader';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import sanitizeHtml from "sanitize-html";
import { GET_AUTHOR_INFO } from '../../graphql/queris';
import { Avatar, Container, Grid, Typography } from '@mui/material';
import CardEl from "../shared/CardEl"

const AuthorPage = () => {
   const { slug } = useParams();

   const { loading, data, error } = useQuery(GET_AUTHOR_INFO, {
      variables: { slug }
   });
   if (loading) return <Loader />
   if (error) return <h1>Error...</h1>
   const { author: { name, avatar, description, field, posts } } = data;
   console.log(data);


   return (
      <Container maxWidth="lg">
         <Grid container mt={10}>
            <Grid
               xs={12}
               item display="flex"
               flexDirection="column"
               alignItems="center"
               justifyContent="center"
            >
               <Avatar src={avatar.url} sx={{ width: 250, height: 250 }} />
               <Typography component="h3" variant="h5" fontWeight={700} mt={4}>{name}</Typography>
               <Typography component="p" variant="h5" fontWeight="500" color="text.secondary" mt={1}>{field}</Typography>

            </Grid>
            <Grid item xs={12} mt={5}>
               <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(description.html) }}>

               </div>

            </Grid>
            <Grid item xs={12} mt={6}>
               <Typography component="h3" variant="h5" fontWeight={700} mb={4}>
                  مقالات {name}
               </Typography>
               <Grid container spacing={2}>
                  {posts.map((post) => (
                     <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <CardEl coverPhoto={post.coverPhoto} title={post.title} slug={post.slug} />
                     </Grid>
                  ))}
               </Grid>

            </Grid>

         </Grid>

      </Container>
   );
};

export default AuthorPage;