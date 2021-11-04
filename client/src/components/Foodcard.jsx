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


function FoodCard (props) {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function handleDelete(id) {
    const token = await getAccessTokenSilently();

    try {
      AllergyDataService.deleteFoodItem(id, token)
      .then(responce => {
        console.log(responce.data)
      return props.getAll();

      })
    } catch(e) {
      console.error(`error in Allergy Data service delete req: ${e}`)
    }

  }




    return (
    <Card sx={{ maxWidth: 345 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {props.name}

      </Typography>
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


    </CardContent>
    <CardActions>
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
        <Checkbox onChange={(e) => {
          e.preventDefault();
          props.downloadCheck(e, props.foodOb)
          props.downloadButton(preValue => {
            e.target.checked ? preValue = preValue + 1 : preValue = preValue -1
            return preValue
          })
        } } size="small" /> 
        </div> }
    
    </CardActions>
  </Card>

  )

}

export default FoodCard;