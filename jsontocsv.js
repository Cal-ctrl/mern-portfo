import {Parser} from "json2csv";
import fs from "fs";
import Excel from "exceljs";


function convertToCsv(jsobject) {
    let fields = {}
    fields.name = jsobject.name
    fields = {...jsobject.diets, ...jsobject.allergyInfo}
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(fields);
    fs.writeFile('./test.csv', csv, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })

}
 
function convertObejectToArray (jsobject) {
    var op = [];
Object.keys(jsobject).forEach(function(key) {
  var obj = {};
  var input = String(key)
  obj.key = input; // Assign columns the keys from the Object
  op.push(obj); 
    })
    return op
}

async function writeToXlsx(jsobject) {
    let fields = {}
    fields = {name: jsobject.name, ...jsobject.diets,blank:"", ...jsobject.allergyInfo, }; //Create Object without any nested data
    const headers = convertObejectToArray(fields)
    const templateWorkbook = new Excel.Workbook();
    await templateWorkbook.xlsx.readFile("./test.xlsx");
    const worksheet = templateWorkbook.getWorksheet('allergen');
    worksheet.columns = headers;

    worksheet.insertRow(6, fields, "i")
    await templateWorkbook.xlsx.writeFile("./test3.xlsx");
}


// writeToXlsx(schema)



