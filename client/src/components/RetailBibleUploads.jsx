import React, { useState } from 'react';
import Papa from "papaparse";
import RetailBibleScannableTable from './RetailBibleScannableTable';
import RetailBibleNegativeTable from './RetailBibleNegativeTable';
import RetailBibleForecastTable from './RetailBibleForecastTable';
import { Button, Container, styled, Stack, Box } from '@mui/material';
import RetailDataService from "../services/retail.js";

const Input = styled('input')({
  display: 'none',
});

function RetailBibleUploads () {

    const stockRoomsTemp = [
      {name: "Cooling Towers", location: "Behind ATMs"},
      {name: "Hendersons", location: "screens 3-5 fire exit"},
      {name: "Four Lions", location: "level 3 outside lift"}, 
      {name: "Full Monty", location: "Bar alcohol Store"},
      {name: "Crucible", location: "8-11 popcorn store"},
      {name: "Stainless Steel", location: "IMAX entrance gorund floor"}
    ]


    const [csv, setCsv] = useState([])
    const [sales, setSales] = useState([])
    const [waste, setWaste] = useState([])
    const columns = ["Item", "Over Counter Qty", "Adjustments Qty", "Closing Qty", "Item Code", "Wastage Qty", "Opening Qty"]


    function handleClick() {
      console.log(`triggered handle click in uploads section`)
      const items = []
      csv.map((item, i) => {
        if(item["Closing Qty"] !== 0){
          delete item.Location
          delete item["Item Type"]
          item.expDate = [true, new Date()]  // if true, perishable. plus date perishing
          items.push(item)
        }
        return console.log(`Updated Items to default`)
      })

      console.log(`items to push to DB`, items);
      
      const retailObject = {
        cinema: "Sheffield Cineworld",
        items: items,
        stockRooms: stockRoomsTemp
      }

      RetailDataService.createRetail(retailObject)
      .then(response =>{
          console.log(response.data); },
          error => {
              console.error(`Error in api request for creating item: ${error}`)
          }
          )
          .catch(e => {
              console.log(`Error on adding retail information, Error: ${e}`);
          })
      return 
      }


    
    return <div>
      <Container sx={{alignItems: "center"}}>
      <Box sx={{display: "grid", gridTemplateColumns: 'repeat(3, 1fr)', my: "20px"}}>
            {/* Upload Stock inquiry files component */}
      <label htmlFor="contained-button-file">
        <Input 
        accept=".csv,.xlsx,.xls" 
        id="contained-button-file" 
        type="file"
        multiple
        onChange={(e) => {
          console.log(`clicked`)
          const files = e.target.files;
          console.log(files);
          if (files) {
            console.log(files[0]);
            Papa.parse(files[0], {
                header: true,
                dynamicTyping: true,
                // preview: 3000, // Testing line for reducing large returns
                complete: function(results) {
                console.log("Finished parsing stock inquiry:  ", results.data);
                setCsv(results.data)
              }}
            )
          }
        }} />
        <Button variant="contained" component="span">
          Upload Stock Inquiry
        </Button>
      </label>
      {/* Upload Sales files component */}
      <label htmlFor="sales-button-file">
        <Input 
        accept=".csv,.xlsx,.xls" 
        id="sales-button-file" 
        type="file"
        multiple
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            console.log(files[0]);
            Papa.parse(files[0], {
                header: false,
                dynamicTyping: true,
                // preview: 1000, // Testing line for reducing large returns
                // Massivley decreases responce time, allows for unaltered data stream to modify each row.
                // step: function(results, parser){
                //   setSales(prev => {
                //     const tempSales = [...prev, results.data]
                //     // prev.push(results.data.splice(14, 3));
                //     return tempSales
                //   }
                //     );
                //     // console.log(`Results from Step upload func: `, results.data)
                // },
                complete: function(results) {
                  setSales(results.data)
                  console.log(`Finshed parsing Sales`, results.data)
                },
              }
            )
          }
        }}
        />
        <Button variant="contained" component="span">
          Upload Sales Report
        </Button>
      </label>
      {/* Upload Wasage report component*/ }
      <label htmlFor="waste-button-file">
        <Input 
        accept=".csv,.xlsx,.xls" 
        id="waste-button-file" 
        type="file"
        multiple
        onChange={(e) => {
          const wasteFile = e.target.files;
          if (wasteFile){
            Papa.parse(wasteFile[0], {
              header: false,
              dynamicTyping: true,
              preview: 1000,
              complete: function(results) {
                setWaste(results.data)
                console.log(`finished parsing waste`, results.data)
              }
            })
          }

        }}
        />
        <Button variant="contained" component="span">
          Upload Wastage Report
        </Button>
      </label>
      </Box>
      {/* <Button onClick={handleClick} variant='outlined'>Submit Retail Items</Button> */}
      </Container>

      <Container maxWidth="xl" disableGutters>
      <h1>Scannables</h1>
      <RetailBibleScannableTable csv={csv} columns={columns}/>
      <h1>Negatives</h1>
      <RetailBibleNegativeTable csv={csv} columns={columns} sales={sales} waste={waste} />
      <h1>Forecast</h1>
      <RetailBibleForecastTable csv={csv} columns={columns} />
      </Container>

</div>

}
export default RetailBibleUploads;