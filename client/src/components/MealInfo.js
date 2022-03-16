import React from 'react';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import AllergenLearnMore from "./AllergenLearnMore"

function MealInfo (props) {

    const learnMore = props.location.state.currentFood

    const style = {
        display: 'grid',
        gap: 1,
        gridTemplateColumns: 'repeat(2, 1fr)',
      }
      console.log(learnMore)

    return (
    <Container fluid>
    <Box sx={style}>
    <div>
    <h1>{learnMore.name}</h1>
    <p>{learnMore.type} dish and this item is currently {learnMore.currentMenu ? "On Menu" : "Off Menu"}</p>
    <h3>Ingredients</h3>
    <p>{learnMore.ingredients ? learnMore.ingredients : "No Ingredients added for this item"}</p>
    </div>
    <img src={learnMore.foodImageName ? "/images/foodImgs/" + learnMore.foodImageName : "/images/vip.jpg"} alt="meal-image" />
    <h3>Calories per Serving: {learnMore.caloriesPerServe || "to be confirmed"} </h3>
    </Box>
    <Box sx={style}>
    <AllergenLearnMore stateKey={false} info={learnMore.diets} />
    <AllergenLearnMore stateKey={true} info={learnMore.allergyInfo} />
    </Box>
    </Container>)
}



export default MealInfo;
