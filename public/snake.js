// import { getInputDirection } from "./input.js"
import { GRID_SIZE } from "./grid.js"
import { food } from "./food.js"
export let SNAKE_SPEED = 2
export const snakeBody = [
    {x: 11, y: 11}
]


let newSegments = 0

let inputDirection = { x: 0, y: 0}

let lastInputDirection = { x: 0, y: 0}



export function update() {


    addSegments()

    for (let i = snakeBody.length - 2; i >= 0; i --){
        snakeBody[i + 1] = {... snakeBody[i]}

    }
    //AI movement here
    if (food !== snakeBody[0]){
        if (food.x < snakeBody[0].x){
            lastInputDirection.x !== 0 ? null : inputDirection = {x: -1, y: 0}
            
        } else if (food.x > snakeBody[0].x){
            lastInputDirection.x !== 0 ? null : inputDirection = {x: 1, y: 0}
            
        } else if (food.y < snakeBody[0].y) {
            lastInputDirection.y !== 0 ? null : inputDirection = {x: 0, y: -1}
            
        } else if (food.y > snakeBody[0].y) {
            lastInputDirection.y !== 0 ? null : inputDirection = {x: 0, y: 1}
            
        } 
        
    }

    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y

    lastInputDirection = inputDirection

    //Check if outside grid then move to other side
    if (snakeBody[0].x > GRID_SIZE) {
        snakeBody[0].x = 1;
    } else if (snakeBody[0].x < 1){
        snakeBody[0].x = GRID_SIZE;
    } else if (snakeBody[0].y > GRID_SIZE){
        snakeBody[0].y = 1;
    } else if(snakeBody[0].y < 1) {
        snakeBody[0].y = GRID_SIZE;
    }


}

export function updateScore (scoreBoard) {
    scoreBoard.innerHTML = "Your score is: " + snakeBody.length
}



export function draw(gameBoard) {
    snakeBody.forEach(section => {
        const snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = section.y
        snakeElement.style.gridColumnStart = section.x
        snakeElement.classList.add("snake")
        gameBoard.appendChild(snakeElement)
    })

}

export function expandSnake(amount){
    newSegments += amount
    SNAKE_SPEED += 1

}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((segment, index) => {
        if(ignoreHead && index === 0) return false
        return equalPositions( segment, position)
    })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments(){
    for(let i = 0; i < newSegments; i++){
        snakeBody.push({ ...snakeBody[snakeBody.length -1]})
    }
    newSegments = 0
    console.log(snakeBody.length);
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection(){

    return onSnake(snakeBody[0], {ignoreHead: true})
}