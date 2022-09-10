import React, { useState } from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SEND_COMMENT } from '../../graphql/mutations';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentForm = ({ slug }) => {

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [text, setText] = useState("");
   // const [pressed, setPressed] = useState(false);


   const [sendComment, { loading }] = useMutation(SEND_COMMENT, {
      variables: {
         name: name,
         email: email,
         text: text,
         slug: slug
      }
   })


   const sendHandler = () => {
      if (name && email && text) {
         sendComment();
         // setPressed(true)
         toast.success("کامنت ارسال شد", {
            position: "top-center",
         })
      } else {
         toast.warn("تمام فیلدهارو پر کن", {
            position: "top-center",
         })

      }
   }
   // if (data && pressed) {
   //    toast.success("کامنت ارسال شد", {
   //       position: "top-center",
   //    })
   //    setPressed(false)
   // }

   return (
      <Grid container
         sx={{
            boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px",
            borderRadius: 4,
            py: 1,
            mt: 5,
         }}>
         <Grid item xs={12} m={2}>
            <Typography component="p" variant="h6" fontWeight={700} color="primary">
               ارسال کامنت
            </Typography>

         </Grid>
         <Grid item xs={12} m={2}>
            <TextField
               label="نام کاربری"
               value={name}
               variant="outlined"
               sx={{ width: "100%" }}
               onChange={(e) => setName(e.target.value)}
               
            />

         </Grid>
         <Grid item xs={12} m={2}>
            <TextField
               label="ایمیل"
               value={email}
               variant="outlined"
               sx={{ width: "100%" }}
               onChange={(e) => setEmail(e.target.value)}
            />

         </Grid>
         <Grid item xs={12} m={2}>
            <TextField
               label="کامنت"
               value={text}
               variant="outlined"
               sx={{ width: "100%" }}
               onChange={(e) => setText(e.target.value)}
               multiline
               minRows={4}
            />

         </Grid>
         {
            loading ?
               <Button variant="contained" disabled>در حال ارسال</Button> :
               <Grid item xs={12} m={2}>
                  <Button variant="contained" onClick={sendHandler}>
                     ارسال
                  </Button>
               </Grid>
         }
         <ToastContainer />

      </Grid>
   );
};

export default CommentForm;