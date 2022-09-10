import React from 'react';



import { useQuery } from "@apollo/client";
// Query
import { GET_BLOGS_INFO } from '../../graphql/queris';

// Mui
import { Grid } from '@mui/material';
// Component
import CardEl from "../shared/CardEl";
import Loader from '../shared/Loader';

const Blogs = () => {

   const { loading, data, error } = useQuery(GET_BLOGS_INFO);

   if (loading) return <Loader />
   if (error) return <h1>Error...</h1>
   // console.log(data);
   return (
      <Grid container spacing={2}>
         {data.posts.map(post => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
               <CardEl {...post} />
            </Grid>
         ))}



      </Grid>
   );
};

export default Blogs;