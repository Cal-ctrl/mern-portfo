import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';


function AllergenLearnMore(props) {


    const fullInfo = Object.entries(props.info)

    

    return (
        <Card>
        <CardHeader avatar={
          <Avatar /*sx={{ bgcolor: red[500] }}*/ aria-label="recipe">
            VIP
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.stateKey ? " Allergen Information" : "Dietry Information" }
        subheader="Full information below" />
        <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        {props.stateKey ? "Allergens in this item" : "Suitable if following these diets" }
      </Typography>
        <List>
        {fullInfo.map(([k,v], i) =>{
        k = k.replace(/_/g, " ")
        return (v && <ListItem>{props.stateKey ? "Contains " : "Suitable for "}{k}</ListItem>)
      })}   
      </List>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        {props.stateKey ? "Allergens not in this item" : "Not suitable if following these diets" }
      </Typography>
      <List>
        {fullInfo.map(([k,v], i) =>{
        k = k.replace(/_/g, " ")
        return (!v && <ListItem>{props.stateKey ? "Does NOT Contain " : "NOT Suitable for "}{k}</ListItem>)
      })}   
      </List>      </CardContent>
        </Card>
    )
    
}

export default AllergenLearnMore;