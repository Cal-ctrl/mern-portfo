import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/esm/Container';
import schema from "../schema";
import AllergenFilter from "./filters/AllergenFilter";
import DietFilter from "./filters/DietFilter";
import NameFilter from "./filters/Name";
import { Box } from '@mui/system';
import Button from 'react-bootstrap/Button'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Fab from '@mui/material/Fab';
import AllergyDataService from "../services/allergy";
import Collapse from '@mui/material/Collapse';

function FilterOptions(props) {
  const initialFilter = schema

    const [tempFilterObject, setTempFilterObject] = useState(initialFilter)
    
    const [filterState, setFilterState] = useState(false)

    const [filters, setFilters] = useState({})

    const dietArray = ["Vegetarian", "Vegan", "Halal_Certified", "Kosher", "Gluten_Free"]
    const allergenArray = ["Milk_and_milk_proteins", "Egss", "Fish", "Peanuts", "Soybeans", "Barley", "Wheat", "Rye", "Oats", "Cereals_containing_gluten", "Crustaceans", "Nuts", "Celery", "Mustard", "Sesame", "Sulphites", "Lupin", "Molluscs" ]


    useEffect(() => {
      handleClear();
    }, [])

    useEffect(() => {
      handleFilter();
    }, [filters])

    const boxStyle = {
      display: 'grid',
      gap: 1,
      gridTemplateColumns: 'repeat(2, 1fr)',}

    function handleChange(e){
      const misc = {...tempFilterObject}
      console.log(e.target.value);
      if (e.target.name === "currentMenu") {
        misc.currentMenu = e.target.checked
        handlesetFilter(e, true);    
      } else {
        misc[[e.target.name]] = e.target.value
        handlesetFilter(e, false);    
      }
      setTempFilterObject(misc)
  }

  function handleDietChange (e) {
      const d = {...tempFilterObject}
      d.diets[[e.target.name]] = e.target.checked
      setTempFilterObject(d)
      console.log(tempFilterObject);
      handlesetFilter(e, true);    

  }
  function handleAllergenChange (e) {
      const a = {...tempFilterObject}
      a.allergyInfo[[e.target.name]] = e.target.checked
      setTempFilterObject(a)
      console.log(tempFilterObject);
      handlesetFilter(e, true);    

  }

  function handlesetFilter(e, check) {
    setFilters(preState => {
      preState[[e.target.name]] = (check ? e.target.checked : e.target.value)
      return {...preState}
    })
  }

  function handleExpand() {
      const filterSchema = schema
      filterSchema.currentMenu = false
      Object.keys(filterSchema.diets).forEach(v => filterSchema.diets[v] = false)
      Object.keys(filterSchema.allergyInfo).forEach(v => filterSchema.allergyInfo[v] = false)
      setTempFilterObject(filterSchema)
  }

  function handleFilter(){
    console.log(filters)
    AllergyDataService.find(filters)
    .then(responce =>{
      props.setFoodList(responce.data.allergy)
      console.log(responce.data);
    })


  }

  function handleClear() {
    handleExpand();
    setFilters({});
    props.getAll();
    return console.log("All Cleared")
  }



    return <div className="filter-option"><Container  > 
    <h3 style={{display: "inline"}}>Filters, expand to filter the items</h3><Fab sx={{display: "inline", ml: 1, mb:1}} style={{
    maxHeight: "30px",
    minHeight: "30px",
    minWidth: "30px",
    maxWidth: "30px",
}} onClick={() => setFilterState(!filterState)}>{!filterState ? <ExpandMoreIcon  fontSize="small" /> : <ExpandLessIcon fontSize="small" />}</Fab>
    <Collapse in={filterState} timeout="auto" unmountOnExit>
    <div >
      <Box sx={boxStyle}>
    <Box sx={boxStyle}>
    <NameFilter onChange={handleChange} filterName={tempFilterObject} />
    <DietFilter onChange={handleDietChange} dietFilterArray={tempFilterObject} />
    </Box>
    <Box sx={{
    display: 'grid',}}>
    <AllergenFilter onChange={handleAllergenChange} allergenFilterArray={Object.entries(tempFilterObject.allergyInfo)} />
    </Box>
    </Box>
    <Box sx={{
    display: 'grid',
    gap: 1,
    gridTemplateColumns: 'repeat(6, 1fr)',
  }}>
      
    <Button className="filter-button" type="submit" onClick={handleClear}>Clear Filters</Button>
    <Button href="/allergen/add">Add</Button>

    

    </Box>
    </div>
    {/* Filter display */}
    <Box sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: `repeat(2, 1fr)`,
        m: "5px",
        }}>
      
      {Object.entries(filters).map(([k, v], i) => {
        if (dietArray.includes(k) || allergenArray.includes(k) && v === true) {        
          const filterDisplay = dietArray.includes(k) ? `Showing foods suitable for ${k.replace(/_/g, " ")} diets` : (allergenArray.includes(k) ? `Showing foods not containing ${k.replace(/_/g, " ")}`: k) 
          return <p>{filterDisplay}</p>
          } else if (dietArray.includes(k) || allergenArray.includes(k) && v === false) {
            const filterDisplay = dietArray.includes(k) ? `Showing foods not suitable for ${k.replace(/_/g, " ")}  diets` : (allergenArray.includes(k) ? `Showing foods containing ${k.replace(/_/g, " ")}`: k) 
          return <p>{filterDisplay}</p>
          } else {
            const filterDisplay = `Show items with ${k} filter: ${v}`
            return <p>{filterDisplay}</p>
          }
    })}

      </Box>

      </Collapse>




    </Container>


    </div>
}

export default FilterOptions;