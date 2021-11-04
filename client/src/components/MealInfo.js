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

    return (
    <Container fluid>
    <Box sx={style}>
    <div>
    <h1>{learnMore.name}</h1>
    <p>{learnMore.type} dish and this item is  {learnMore.currentMenu ? "On Menu" : "Off Menu"}</p>
    <h3>Ingredients</h3>
    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
    </div>
    <img src="https://www.cineworld.ie/static/dam/jcr:f44bd104-7cbe-419e-b4ee-c2245444cdd7/VIP_Desktop_Blog-Hero-Banner_620x300px.jpg" alt="meal-image" />
    </Box>
    <Box sx={style}>
    <AllergenLearnMore stateKey={false} info={learnMore.diets} />
    <AllergenLearnMore stateKey={true} info={learnMore.allergyInfo} />
    </Box>
    </Container>)
}



export default MealInfo;
