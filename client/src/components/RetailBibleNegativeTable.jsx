import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Papa from "papaparse";

function RetailBibleNegativeTable (props) {
  const sellingCsv = []
  const wasteCsv = []
  const prevCsv = []
  const miscCsv = []
  let fields = []
  const recipeItems = ["BR Ice Cream All Flavours", "BR Cold Toppings Components", "BR Hot Toppings Components", "UK-Pick n Mix", "UK-Jimmys Weaver Gold Corn 22.68kg"]

  function addFields(row) {
    const errors = ["Miss Ringing", "Wastage Error", "Previous Week", "Recipe Error"]
    Object.keys(row).forEach(key => {
      !fields.includes(key) && fields.push(key)
      return
    })
    errors.forEach(field => {
      !fields.includes(field) && fields.push(field)
      return
    })
    return
  }



    function handleClick () {
      const csvArray = [...sellingCsv, ...wasteCsv, ...prevCsv, ...miscCsv]
      const parseCsv = Papa.unparse({
        headers: false,
        fields: fields,
        data: csvArray,
      });
      const link = document.createElement('a')
      link.href = 'data:text/csv,' + encodeURIComponent(parseCsv)
      link.download = `negatives_results.csv`
      link.click()
      return console.log("All CSV completed")
    }


    return (<div>
        <Button variant='primary lg' onClick={handleClick}>Download all as CSV</Button>
        <TableContainer component={Paper}>
        <h4>Selling errors</h4>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.columns.map((header, i) => {
                  return <TableCell align= {header === "Item" ? "left" : "right" }>{header}</TableCell>
                })}
                <TableCell>Till users mis ringing</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.csv.map((row, index) => {
                let salesTrack = 1
                  if (row["Closing Qty"] < 0 && row["Over Counter Qty"] > 0 && !recipeItems.includes(row.Item)){
                    row["Miss Ringing"] = "Yes"
                    sellingCsv.push(row)
                    addFields(row)
                      return (
                        <TableRow
                        key={row.Item + index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {props.columns.map(col => {
                            return <TableCell align= {col === "Item" ? "left" : "right" }>{row[col]}</TableCell>
                        })}
                        {props.sales.map((sale, i) => {
                          if(sale[0] === null || row.Item === "UK-Spiderman No Way Home Cup") {
                            return
                          }
                          try {
                            const stockItemConvert = row.Item.replace("UK-", "")
                            if ( sale[14].includes(row.Item) || sale[14].includes(stockItemConvert) || sale[14].includes("IRE") ) {
                              sellingCsv[sellingCsv.length - 1] = {...sellingCsv[sellingCsv.length - 1], [`Sale ${salesTrack}`]: sale[15] + " " + sale[16]}                    
                              !fields.includes(`Sale ${salesTrack}`) && fields.push(`Sale ${salesTrack}`)
                              salesTrack += 1
                              return <TableCell>{sale[15]} {sale[16]}</TableCell>
                          } 
                          } catch (e) {
                            console.log(`Error in matching sale product to negative`,e)
                          }
                          
                        })}
                       
                        </TableRow>
                      )
                      
                  }
                  
              })}

            </TableBody>
            </Table>
            <h4>Wastage errors</h4>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.columns.map((header, i) => {
                  return <TableCell align={header === "Item" ? "left" : "right" }>{header}</TableCell>
                })}
                <TableCell>Wastage errors</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {props.csv.map((row, i) => {
              let wasteTrack = 1
                  if (row["Closing Qty"] < 0 && row["Wastage Qty"] !== 0 && !recipeItems.includes(row.Item)){     
                      row["Wastage Error"] = "Yes"
                      addFields(row)
                      wasteCsv.push(row)
                      return (
                        <TableRow
                        key={row.Item + i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {props.columns.map(col => { 
                            return <TableCell align= {col === "Item" ? "left" : "right" } >{row[col]}</TableCell>
                        })}
                        {props.waste.map((wasteItem, i) => {
                          if(wasteItem[29] === null) {
                            return
                          }
                          try {
                            const stockItemConvert = row.Item.replace("UK-", "").replace(" Postmix", "")
                            if ( wasteItem[29].includes(row.Item) || wasteItem[29].includes(stockItemConvert)) {
                              wasteCsv[wasteCsv.length - 1] = {...wasteCsv[wasteCsv.length - 1], [`Wastage Error ${wasteTrack}`]: wasteItem[30] + " " + wasteItem[37]}                    
                              !fields.includes(`Wastage Error ${wasteTrack}`) && fields.push(`Wastage Error ${wasteTrack}`)
                              wasteTrack += 1  
                              return <TableCell>{wasteItem[30]} {wasteItem[37]}</TableCell>
                          } 
                          } catch (e) {
                            console.log(`Error in matching wate item to negative`,e)
                          }
                        })}
                        </TableRow>
                      )

                  }
              })}
            </TableBody>
            </Table>
            <h4>Previous week errors</h4>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.columns.map((header, i) => {
                  return <TableCell align= {header === "Item" ? "left" : "right" }>{header}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.csv.map((row, i) => {
                  if (row["Closing Qty"] < 0 && row["Closing Qty"] === row["Opening Qty"]){
                      row["Previous Week"] = "Yes"                   
                      prevCsv.push(row) 
                      return (<TableRow
                                key={row.Item + i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {props.columns.map(col => {
                                  return <TableCell align= {col === "Item" ? "left" : "right" }>{row[col]}</TableCell>
                                })}
                              </TableRow>
                             )
                  }
                })}
            </TableBody>
            </Table>
            <h4>Misc errors</h4>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.columns.map((header, i) => {
                  return <TableCell align= {header === "Item" ? "left" : "right" }>{header}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.csv.map((row, i) => {
                  if (row["Closing Qty"] < 0 && recipeItems.includes(row.Item)){
                      row["Recipe Error"] = "Yes"
                      miscCsv.push(row)
                    return (<TableRow
                                key={row.Item + i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {props.columns.map(col => {
                                  return <TableCell align= {col === "Item" ? "left" : "right" }>{row[col]}</TableCell>
                              })}
                              </TableRow>
                             )
                  }
              })}
            </TableBody>
            </Table>
 
      </TableContainer>
      </div>

    )       

}

export default RetailBibleNegativeTable;