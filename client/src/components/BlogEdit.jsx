import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import { Container, FormControl, InputLabel, Input, Stack, TextField, Button} from "@mui/material";
import BlogDataService from "../services/blog";
import Form from "react-bootstrap/Form"

export default function BlogEdit(props) {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [like, setLikes] = useState(0);
    const [fileName, setFileName] = useState();




    const handleBlogChange = (e) => {
        e.preventDefault();
        if (e.target.id === "blog-title") {
            setTitle(e.target.value)
        }
        if (e.target.id === "blog-content"){
            setContent(e.target.value)
        }
        return
    }

    async function submitBlog () {
        const data = new FormData()
        data.append("title", title);
        data.append("content", content);
        data.append("blogImage", fileName);

        console.log(data);

        BlogDataService.createBlog(data)
            .then( res => {
                console.log(res.data);
                window.alert(res.data.status)
            })
            .catch(err => {
                console.error(err, "Error in creating blog");
            })
    }


    return (
        <Container sx={{mt: "25px", mb: "25px"}}>
            <Stack spacing={2}>
                <FormControl  sx={{ m: 1}} variant="standard">
                        <InputLabel htmlFor="blog-title">Title</InputLabel>
                        <Input id="blog-title" value={title} onChange={handleBlogChange} label="Title" />
                </FormControl>
                <FormControl sx={{ m: 1}}>
                    <TextField label="Content" id="blog-content" value={content} onChange={handleBlogChange}multiline />
                </FormControl>
                <Form.Group controlId="formFile"  encType="multipart/form-data">
          <Form.Label><h5>Upload image</h5></Form.Label>
          <Form.Control type="file" onChange={ e => {
              const file = e.target.files[0]
              setFileName(file)
          }}/>
      </Form.Group>
                <Button variant="contained" component="span" onClick={submitBlog}>Submit Blog</Button>

            </Stack>
        </Container>
    )

}