import { Button, Container, Box} from "@mui/material";
import React, {useState, useEffect} from "react";
import RetailDataService from "../services/retail.js";
import RetailBibleDateTracker from './RetailBibleDateTracker.jsx';
import RetailBibleStockRooms from './RetailBibleStockRooms.jsx';
import RetailBibleAddItemForm from "./RetailBibleAddItemForm";

function RetailBibleLiveStockHandle(props) {
    const [cinemaRetail, setCinemaRetail] = useState()
    const [stockRooms, setStockRooms] = useState([])
    const [items, setItems] =  useState([])

    useEffect(()=>{
      getCinemaRetail();
      // console.log(props.user);
    }, [])
  
    function getCinemaRetail(){
      // get all items debug line

      //  RetailDataService.getAll()
      //  .then(response => {
      //       console.log(response);
      //       setCinemaRetail(response.data.cinemas[1])
      //       setStockRooms(response.data.cinemas[1].stockRooms)
      //       const itemsToSort = response.data.cinemas[1].items
      //       console.log(itemsToSort[0])
      //       itemsToSort.sort((a, b) => {return new Date(b.expDate[1]) - new Date(a.expDate[1])})
      //       setItems(itemsToSort)

      //   })
        RetailDataService.find(props.email, "email")
        .then(response => {
             console.log(response);
             setCinemaRetail(response.data.cinemas[0])
             setStockRooms(response.data.cinemas[0].stockRooms)
             const itemsToSort = response.data.cinemas[0].items
             console.log(itemsToSort[0])
             itemsToSort.sort((a, b) => {return new Date(b.expDate[1]) - new Date(a.expDate[1])})
             setItems(itemsToSort)
 
         })
    }

    function updateDateTracker (){
        items.forEach( i => delete i["Item Class"])
        const updateObject = {
            id:cinemaRetail._id,
            cinema: cinemaRetail.cinema,
            stockRooms: stockRooms,
            items:items,
        }
        console.log(`update item id: ${updateObject.id}`)
        RetailDataService.updateRetail(updateObject)
        .then(response => {
            console.log(response);
            alert(`Your update was a : ${response.data.status}`)
        });
    }
  
  
    return (
      <Container maxWidth="xl" disableGutters>
      <h2 className="header">Stock Rooms</h2>
      <RetailBibleStockRooms stockRooms={stockRooms} setStockRooms={setStockRooms} items={items} />
      <br />
      <h2>Date and Stock Location Tracker</h2>
      <p>Use this button and this table to track dates and stock location</p>
      <Button onClick={updateDateTracker}>Save Changes Stock and Date</Button>
      <Box sx={{    
        display: 'grid',
        gap: 1,
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
        }}> 
      <RetailBibleDateTracker items={items} setItems={setItems} stockRooms={stockRooms} setStockRooms={setStockRooms}  itemFocus={false}/>
      <RetailBibleDateTracker items={items} setItems={setItems}  itemFocus={true}/>

      </Box>
      <br />
      <Container>
      {cinemaRetail && <RetailBibleAddItemForm cinemaRetail={cinemaRetail} setCinemaRetail={setCinemaRetail}/>}
      </Container>
      <br />
      </Container>
    )
  }
  
  export default RetailBibleLiveStockHandle;