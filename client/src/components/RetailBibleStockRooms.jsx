import { Box } from "@mui/system";
import React from "react";
import StockRoomCard from "./StockRoomCard";

function RetailBibleStockRooms (props) {

    const style = {
        display: 'grid',
        gap: 1,
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))"
      }

    return  <div>
                <Box sx={style}>
                    {props.stockRooms.map((room, i) => {
                        return <StockRoomCard room={room} items={props.items} key={i}/>
                    })}
                </Box>
            </div>
}
export default RetailBibleStockRooms;