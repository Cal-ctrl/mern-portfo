import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function RetailBibleIcesCard(props) {
    return <Card sx={{ minWidth: 100 }}>
    <CardContent>
      <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
        BR Flavour
      </Typography>
      <Typography sx={{ fontSize: 10 }} component="div">
        {props.name}
      </Typography>
      <Typography sx={{ fontSize: 8 }} component="div">
        {props.expDate}
      </Typography>

    </CardContent>

  </Card>
}

export default RetailBibleIcesCard;
