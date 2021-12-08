// import { food } from "./food.js"
// import { snakeBody } from "./snake.js"

let inputDirection = { x: 0, y: 0}

let lastInputDirection = { x: 0, y: 0}

window.addEventListener("click", e => {
    console.log(`clicked`);
    console.log(e.target.getBoundingClientRect());
})


// window.addEventListener("keydown", e => {
//     switch (e.key) {
//         case "ArrowUp" : 
//         if (lastInputDirection.y !== 0) break
//         inputDirection = {x: 0, y: -1}
//         break
//         case "ArrowDown" : 
//         if (lastInputDirection.y !== 0) break
//         inputDirection = {x: 0, y: 1}
//         break
//         case "ArrowLeft" : 
//         if (lastInputDirection.x !== 0) break
//         inputDirection = {x: -1, y: 0}
//         break
//         case "ArrowRight" : 
//         if (lastInputDirection.x !== 0) break
//         inputDirection = {x: 1, y: 0}
//         break
//     }
// })

if (food.x !== snakeBody[0].x || food.y !== snakeBody[0].y){
    if (food.x < snakeBody[0].x){
        inputDirection = {x: -1, y: 0}
    } else if (food.x > snakeBody[0].x){
        inputDirection = {x: 1, y: 0}

    } else if (food.y < snakeBody[0].y) {
        inputDirection = {x: 0, y: -1}

    } else if (food.y > snakeBody[0].y) {
        inputDirection = {x: 0, y: 1}

    } 
    
}

export function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection

}