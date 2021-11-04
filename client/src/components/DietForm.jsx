import React from "react";
import Form from 'react-bootstrap/Form'
import Switch from '@mui/material/Switch';



function DietForm (props) {
    const newDietArray = Object.entries(props.newDietInfo)

    return (
        newDietArray.map(([k, v], i)=> {
            return (
                <div key={i}>
                <Switch onChange={props.onChange} name={k} checked={v}/>
                <Form.Label>{k.replace(/_/g, " ")}</Form.Label>
                </div>
            )
        })
    )
    
}

export default DietForm;