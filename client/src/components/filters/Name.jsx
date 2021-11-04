import Form from 'react-bootstrap/Form'
import React from "react";
import { Switch } from '@mui/material';




function NameFilter(props) {

    return (
    <Form.Group>
    <Form.Label>Name</Form.Label>
    <Form.Control onChange={(e) => {
        e.preventDefault();
        props.onChange(e)}
        } name="name" value={props.filterName.name}/>
    <Form.Label>Type</Form.Label>
    <Form.Select onChange={(e) => {
        e.preventDefault();
        props.onChange(e)}} name="type" value={props.filterName.type}>  
    <option>Choose menu type</option>
    <option value="Starter">Starter</option>
    <option value="Main">Main</option>
    <option value="Dessert">Dessert</option>
    <option value="Side">Side</option>
    <option value="Drink">Drink</option>
  </Form.Select>

    <Form.Label>On Menu</Form.Label>
    <Switch onChange={(e) => {
        e.preventDefault();
        props.onChange(e)}
        } name="currentMenu" checked={props.filterName.currentMenu}/>


    </Form.Group>
    )

}

export default NameFilter;