import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function RetailBibleForecastTable(props) {

    return (
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
                  if (row["Closing Qty"] < row["Over Counter Qty"] && row["Closing Qty"] > 0){
                      const differenceCurrentAndSold = row["Over Counter Qty"] - row["Closing Qty"]
                      const stockLevelIndicator = differenceCurrentAndSold > row["Closing Qty"] ? "#FDA65D" : "#DBD0C0"

                      return (
                        <TableRow
                        key={row.Item + i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, bgcolor: stockLevelIndicator }}
                        >
                        {props.columns.map(col => {
                            return <TableCell align='right'>{row[col]}</TableCell>
                        })}
                        </TableRow>
                      )
                  }
              })}
            </TableBody>
        </Table>
      </TableContainer>
    

    )       
}

export default RetailBibleForecastTable;