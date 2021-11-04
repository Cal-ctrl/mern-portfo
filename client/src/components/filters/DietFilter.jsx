import React from "react";
import Form from 'react-bootstrap/Form'
import Switch from '@mui/material/Switch';





function DietFilter(props) {
    const dietFilter = Object.entries(props.dietFilterArray.diets)

    return (
        <Form.Group>
        <Form.Label>Diet preference</Form.Label>
        {dietFilter.map(([k, v], i) => {
            const tempName = k.replace(/_/g, " ")
            return (
            <div key={i}>
            <Switch color="warning" onChange={(e)=> {
                e.preventDefault()
                try{
                    props.onChange(e);
                }
                catch(e) {
                    console.error(e);
                }
                
            }} name={k} checked={v}/>
            <Form.Label>{tempName}</Form.Label>
            </div>
            )
        })}

    
        </Form.Group>
        )
}

export default DietFilter;