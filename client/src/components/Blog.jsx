import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import BlogDataService from "../services/blog";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

export default function Blog(props){


  async function handleDelete(id) {
    await BlogDataService.deleteBlog(id)
      .then(res => {
        console.log(res);
      })
      .catch(e => console.error(e, `error in delete request`))
  }

  let imagePath = "./images/blogging.jpg"
  const dateAdded = new Date(props.blog.date).toLocaleDateString();

  
    return(
    <div>
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.blog.blogImg ? imagePath.replace("blogging.jpg", props.blog.blogImg) : imagePath}
          alt="blog"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.blog.content}
          </Typography>
          <Typography>
            Date added: {dateAdded}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Button size="small" color="info">
          Read More
        </Button>
        {/* <Button size="small" color="primary">
          Update
        </Button> */}
        <Button onClick={e => {
          e.preventDefault();
          handleDelete(props.blog._id)
        }}size="small" color="warning">
          Delete
        </Button>
      </CardActions>
    </Card>
    </div>

    )
}