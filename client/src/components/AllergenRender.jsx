import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import AllergyDataService from "../services/allergy";
import Foodcard from "./Foodcard.jsx";
import { Box } from '@mui/system';
import FilterOptions from "./FilterOptions.jsx";
import Button from '@mui/material/Button';

import {Parser} from "json2csv";


function AllergenRender() {

    const [foodList, setFoodList] = useState([])
    const [downloadButton, setDownloadButton] = useState(0)
    const [downloadSelected, setDownloadSelected] = useState([])
    const [isChecked, setIsChecked] =useState([])

    /*Create array of Bools equal to length of Allergy list
    Set all to false 
    Use array to send values to check boxesin foodcard
    when checked, access the index of that array and change to true
    when select all func used, change all values to true */


    useEffect(()=>{
        retrieveFoodList();
    }, [])

    useEffect(() => {
        console.log(`triggered checked array populate`);
            let temp = new Array(foodList.length).fill(false)
            setIsChecked(temp)
            console.log(isChecked);

    }, [foodList])


    function retrieveFoodList () {
        AllergyDataService.getAllAllergy()
        .then(response => {
            setFoodList(response.data.allergy)
        })


        
    }

    function collateDownloadSelect (e, selected) {

        if (e.target.checked === "selectAll") {
            setDownloadSelected(selected)
        } else if (e.target.checked) {
            const tempArray = [...downloadSelected]
            tempArray.push(selected)
            setDownloadSelected(tempArray)
        } else if (!e.target.checked) {
            console.log(`unchecked`);
        }
        
        return;

    }

    function downloadSelectedFunc () {
            const unested = []
            downloadSelected.map((jsonObject) =>{
                let fields = {}
                fields = {name: jsonObject.name, ...jsonObject.diets,blank:"", ...jsonObject.allergyInfo, }; //Create Object without any nested data
                unested.push(fields)
                return console.log(fields);
                })
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(unested);
            
            const link = document.createElement('a')
            link.href = 'data:text/csv,' + encodeURIComponent(csv)
            link.download = 'allergen.csv'
            link.click()
          }

          function selectAll (){
              console.log(`triggered Select all func`);
              let selectAll = new Array(foodList.length).fill(true)
              setIsChecked(selectAll)
              setDownloadButton(foodList.length)
              collateDownloadSelect({target: {checked: "selectAll"}}, foodList)
          }

          function unselectAll () {
              console.log(`triggered unSelect func`);
              let unSelectArray = new Array(foodList.length).fill(false)
              setIsChecked(unSelectArray)
              setDownloadButton(0)
              setDownloadSelected([])

          }


    return (
        <Container className="padding-rm" fluid>

        <FilterOptions setFoodList={setFoodList} getAll={retrieveFoodList} />
        <Container className="bg-light" fluid>
        <h1 className="menu-head">Menu Items</h1>

        <Container >
        <Button onClick={selectAll} >Select All</Button>
        <Button onClick={unselectAll}> Unselect All </Button>

        {downloadButton > 0 &&
        <Button onClick={downloadSelectedFunc}>Download</Button>
        }

        <Box className="food-cards" sx={{
    display: 'grid',
    gap: 1,
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"
    
  }}>

        {foodList.map((food, i) => {
            const dietInfo = Object.entries(food.diets)
            const allergyInfo = Object.entries(food.allergyInfo)
            const typeURL = "images/" + food.type + ".jpg"

        return (
            <Foodcard
                key={i}
                arrayIndex={i}
                name={food.name}
                img={food.foodImageName}
                restaurant={food.restaurant}
                dietInfo={dietInfo}
                allergyInfo={allergyInfo}
                id={food._id}
                foodOb={food}
                getAll={retrieveFoodList}
                downloadCheck={collateDownloadSelect}
                downloadButton={setDownloadButton}
                isChecked={isChecked[i]}
                setIsChecked={setIsChecked}
                type={typeURL}

            /> 
        )      
        })}
        </Box>
        </Container>

        </Container>

        </Container>

    );
    }

export default AllergenRender;