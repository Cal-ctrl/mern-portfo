import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Papa from "papaparse"

function RetailBibleScannableTable (props) {
  const scanArray = []

  function handleClick () {
    const parseCsv = Papa.unparse(scanArray)
    const link = document.createElement('a')
    link.href = 'data:text/csv,' + encodeURIComponent(parseCsv)
    link.download = `negatives_results.csv`
    link.click()
    return console.log("All CSV completed")
  }


    return(<div>
        <Button variant='primary' onClick={handleClick}>Download as CSV</Button>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {props.columns.map((header, i) => {
                  return <TableCell align="right">{header}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.csv.map((row, i) => {
                try{
                  if (row.Item.includes("SCAN") && row["Closing Qty"] !== 0){
                    scanArray.push(row)
                      return (
                        <TableRow
                          key={row.Item + i}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {props.columns.map(col => {
                            {/* console.log(col, row[col]) */}
                            return <TableCell align='right'>{row[col]}</TableCell>
                            })}
                        </TableRow>
                      )
                  } else {
                    return
                  }

                }catch(e){
                  console.error(e)
                  console.log(`This item has error with includes: `, row)
                }

              })}
            </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
}


export default RetailBibleScannableTable