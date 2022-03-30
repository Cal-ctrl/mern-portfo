import { Box, FormControl, TextField,  OutlinedInput, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import "moment/locale/en-gb";
import moment from "moment";
import RetailDataService from "../services/retail.js";
moment.locale("en-gb");



function RetailBibleAddItemForm (props) {
    const locale = "en-gb"

    const [newItem, setNewItem] = useState({
        Item: "",
        expDate: [true, new Date()],
        "Stock Location": "Henderson's Store"
    })

    const style = {    
        display: 'grid',
        gap: 5,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
        }

    function handleNewItemClick() {

        const tempCinemaInfo = props.cinemaRetail
        tempCinemaInfo.items.push(newItem)    
        RetailDataService.updateRetail(tempCinemaInfo)
        .then(res => {
            console.log(res)
            if (res.status !== 200) return
            alert(`New Item import was a success`)
            return
        })
    }

    return <FormControl>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >

            <TextField
            required
            id="outlined-required"
            label="Item Name Required"
            value={newItem.Item}
            onChange={e => {
                e.preventDefault();
                const tempItem = newItem
                tempItem.Item = e.target.value
                setNewItem({...tempItem})
                return console.log(`Stock location changed locally`)
            }}
            />
            <TextField
            select
            sx={{m: 0}}
            id="new-item-stock-location"
            label="Stock Location"
            value={newItem["Stock Location"]}
            input={<OutlinedInput label="Stock Location" />}
            onChange={e => {
                    e.preventDefault();
                    const tempItem = newItem
                    tempItem["Stock Location"] = e.target.value
                    setNewItem({...tempItem})
                return console.log(`Stock location changed locally`)
            }}
            
            >
            {props.cinemaRetail.stockRooms.map((room, i) =>{
                return <MenuItem value={room.name} key={room + i}>{room.name}</MenuItem>
            })}
            </TextField>
            <LocalizationProvider dateAdapter={DateAdapter} locale={locale} >
                            <MobileDatePicker
                            mask="__/__/____"
                            label="Exp Date"
                            value={newItem.expDate[1]}
                            onChange={(newDate) => {
                                const tempItem = newItem
                                tempItem.expDate[1] = newDate
                                setNewItem({...tempItem})
                              return console.log(`Date changed locally`, newItem.expDate[1])
                            }}
                            renderInput={(date) => <TextField {...date}/>}
                            />
            </LocalizationProvider>
            <Button variant="contained" sx={{height: 59, mt:0.5}} onClick={handleNewItemClick} endIcon={<SendIcon />}>
            Send New Item to Track
            </Button>
            </Box>

            </FormControl>

    

}

export default RetailBibleAddItemForm;