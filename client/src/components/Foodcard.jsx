import React from 'react';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AllergyDataService from "../services/allergy";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useAuth0 } from "@auth0/auth0-react";
import CardMedia from '@mui/material/CardMedia';


function FoodCard (props) {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function handleDelete(id) {
    const token = await getAccessTokenSilently();
      AllergyDataService.deleteFoodItem(id, token)
      .then(responce => {
        console.log(responce.data)
      return props.getAll();

      }, error => {
        console.error(`error in Allergy Data service delete req: ${error}`)
        alert(`youmay not have permissions to delete this item, contact admin for further info or login`)
      })


  }

  function handleChange(e) {
    e.preventDefault();
    props.downloadCheck(e, props.foodOb)
    props.downloadButton(preValue => {
      e.target.checked ? preValue += 1 : preValue -= 1
      return preValue
        })
    props.setIsChecked(previous => {
      let temp = previous
      temp[props.arrayIndex] = !temp[props.arrayIndex]
      return temp
          })

  }




    return (
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterbottom>
        {props.name}

      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={props.type}
        alt="main"
      />
      <List>
      {props.dietInfo.map(([k,v], i) =>{
        k = k.replace(/_/g, " ")
        return (v && <ListItem key={i}>Suitable for {k}</ListItem>)
      })}      
      {props.allergyInfo.map(([k,v], i) =>{
        k = k.replace(/_/g, " ")
        return (v && <ListItem key={i}>Contains {k}</ListItem>)
      })}
      </List>
      {props.restaurant && <Typography sx={{ fontSize: 14}} color="text.secondary" gutterBottom>Serving at {props.restaurant.replace(/_/g, " ")}</Typography>}
      
    </CardContent>
    <CardActions gutterBottom>
    <Link variant="button" className="btn btn-outline-primary btn-sm" to={{
        pathname: "/allergen/" + props.id,
        state: {
          currentFood: props.foodOb
        }
          }}>Learn More</Link>
    {isAuthenticated && <div>
    <Link variant="button" className="btn btn-outline-primary btn-sm" to=""  onClick={(e) => {
    e.preventDefault();
    handleDelete(props.id)}}>Delete</Link>
    <Link variant="button" className="btn btn-outline-primary btn-sm" to={{
        pathname: "/allergen/" + props.id + "/add",
        state: {
              currentFood: props.foodOb
            }
          }}>Update</Link>

        <Checkbox onChange={handleChange} size="small" checked={props.isChecked || false}/> 
        </div> }
    
    </CardActions>
  </Card>

  )

}

export default FoodCard;