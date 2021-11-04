import { Switch } from "@mui/material";
import React from "react";
import Form from 'react-bootstrap/Form'
import { Box } from '@mui/system';




function AllergenFilter(props) {

    return (
        <Form.Group>
        <Form.Label>Allergens containing</Form.Label>
        <Box sx={{
    display: 'grid',
    rowGap: 1,
    gridTemplateColumns: 'repeat(2, 1fr)',
  }}>{
      props.allergenFilterArray.map(([k,v],i) => {
        const tempName = k.replace(/_/g, " ")
          return (
            <div key={i}>
            <Switch onChange={(e) => {
                e.preventDefault();
                props.onChange(e);
                }} name={k} checked={v} />
            <Form.Label>{tempName}</Form.Label>
            </div>
          )
      })
  }
        </Box>
    
        </Form.Group>
        )
}

export default AllergenFilter;