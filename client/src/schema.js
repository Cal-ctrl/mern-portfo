
const schema = {
    name: "",
     diets:{
        Vegan:false,
        Vegetarian:false,
        Halal_Certified :false,
        Kosher :false,
        Gluten_Free:false
    }
        ,
    allergyInfo: {
        Cereals_containing_gluten:true,
        Wheat:true,
        Rye:true,
        Barley:true,
        Oats:true,
        Crustaceans:true,
        Eggs:true,
        Fish:true,
        Peanuts:true,
        Soybeans:true,
        Milk_and_milk_proteins:true,
        Nuts:true,
        Celery:true,
        Mustard:true,
        Sesame:true,
        Sulphites:true,
        Lupin:true,
        Molluscs:true},
    currentMenu:true,
    type: "",
    imgURL: "",
    dateAdded: "",
    dateOffMenu: ""
}

export default schema;