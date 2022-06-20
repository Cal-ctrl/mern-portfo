import React, { useEffect, useState } from "react";
import { Container } from '@mui/material';
import BlogDataService from "../services/blog"
import Blog from "./Blog"
import BlogEdit from "./BlogEdit";

function BlogHost() {

    const [blogList, setBlogList] = useState([]);
    
    useEffect(() => 
        getBlogs());

    function getBlogs(){
        BlogDataService.getAll()
            .then(res => {
                setBlogList(res.data.blogs)
            })
    }

    return <Container>
    <BlogEdit />
    {blogList.map((blog, index) => {
        return <Blog key={index + new Date} blog={blog} />
    })}
    </Container>
}

export default BlogHost;
