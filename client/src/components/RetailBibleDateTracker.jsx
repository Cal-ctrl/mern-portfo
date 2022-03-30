import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateAdapter from '@mui/lab/AdapterMoment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import "moment/locale/en-gb";
import moment from "moment";

moment.locale("en-gb");

function RetailBibleDateTracker (props) {
    let items = []
    const locale = "en-gb"
    const columns = ["Item", "expDate", "Stock Location"]
    if (props.itemFocus) {
      items = props.items.filter(i => (new Date(i.expDate[1]) - new Date() < 1810000000))

    } else {
      items = props.items
    }

    return <div>
    {props.itemFocus ? <h1>Short dates</h1> : <h1>Full stock list</h1>}
    <TableContainer component={Paper} sx={{maxHeight: 440}}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date Tracking</TableCell>
            {columns.map((header, i) => {
              return <TableCell align="left" key={i + header}>{header}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
        {items.map((row, i) => {
          const itemDate = new Date(row.expDate[1]) - new Date()
            if (row.expDate[0]){
              !row["Stock Location"] && (items[i]["Stock Location"] = "Hendersons");
                return <TableRow
            key={row.Item + i}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor : (itemDate < 1810000000 ? "#FDA65D" : "#DBD0C0")}}
          ><TableCell padding="checkbox">
              <Checkbox
                color="primary"
                checked={items[i].expDate[0]}
                onChange={(e) => {
                    e.preventDefault();
                    const temp = items
                    temp[i].expDate[0] = !temp[i].expDate[0]
                    console.log(temp[i])
                    props.setItems([...temp])
                    }}
              />
            </TableCell>{columns.map(col => {
              {/* console.log(col, row[col]) */} //Debug Line
              let cell
              try {
                  if (col === "expDate"){
                      return <TableCell align="left" key={col + row.Item}>
                            <LocalizationProvider dateAdapter={DateAdapter} locale={locale} >
                            <MobileDatePicker
                            mask="__/__/____"
                            label="Exp Date"
                            value={row[col][1]}
                            onChange={(newDate) => {
                              const temp = items
                              temp[i].expDate[1] = newDate
                              props.setItems([...temp])
                              return console.log(`Date changed locally`)
                            }}
                            renderInput={(date) => <TextField {...date}/>}
                            />
                            </LocalizationProvider>
                            </TableCell>
                  } else if ( !props.itemFocus && col === "Stock Location"){
                    return <TableCell align="left" key={col + row.Item}>
                              <TextField
                              select
                                label="Location"
                                id="Store Location Handler"
                                value={row[col]}
                                input={<OutlinedInput label="Store Location" />}
                                onChange={e => {
                                  e.preventDefault();
                                  const tempStock = items
                                  tempStock[i]["Stock Location"] = e.target.value
                                  props.setItems([...tempStock])
                                  return console.log(`Stock location changed locally`)
                                }}
                                
                                >
                                {props.stockRooms.map((room, i) =>{
                                  return <MenuItem value={room.name} key={room + i}>{room.name}</MenuItem>
                                })}
                              </TextField>
                    </TableCell>

                  } else {
                      cell = row[col]
                  }
              } catch (e) {
                  console.log(`error in creating expDate: ${e}`)
              }
              
                  return <TableCell align='left' key={col + row.Item}>{cell}</TableCell>
              })}</TableRow>

              }
              }
        )}
        </TableBody>
    </Table>
  </TableContainer>

  </div>
}

export default RetailBibleDateTracker;

