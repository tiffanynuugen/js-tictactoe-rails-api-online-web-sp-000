window.onload = () => {
  attachListeners()
}

function attachListeners() {
// listens to when a square is clicked
  const squares = document.querySelectorAll("td").forEach(square => {
    square.addEventListener("click", () => {
        doTurn(square)
    })
  })

  // const body = document.querySelector("tbody").addEventListener("click", () => {
  //   const x = event.target.dataset.x
  //   const y = event.target.dataset.y
  //   const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
  // })

}

// global variable
var turn = 0

// returns "X" or "O" based on either even/odd turn count
function player() {
  if (turn % 2 === 0 || isNaN(turn)) {
    return "X"
  } else {
    return "O"
  }
}

// adds "X" or "O" on to clicked square
function updateState(square) {
  square.innerHTML = player()
}

function checkWinner() {
  // create empty array
  const board = []
  // come up with an array of all possible winning combos - horizontally, vertically, and diagonally
  const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  // then iterate over array and get each combo

  // get all of the X's, O's, or blanks from all of the squares
  const squares = document.querySelectorAll("td").forEach(square => board.push(square.innerHTML))

  // winningCombos.forEach(combo => {
  //   // console.log(combo[0]);
  //   // console.log(combo[1]);
  // })

  const indicesOfO = board.reduce((acc, el, i) => (el === "O" ? [...acc, i] : acc), [])
  const indicesOfX = board.reduce((acc, el, i) => (el === "X" ? [...acc, i] : acc), [])
  // // debugger
  if (indicesOfX === winningCombos[0] || indicesOfX === winningCombos[1] || indicesOfX === winningCombos[2] || indicesOfX === winningCombos[3] || indicesOfX === winningCombos[4] || indicesOfX === winningCombos[5] || indicesOfX === winningCombos[6] || indicesOfX === winningCombos[7]) {
    return true
  } else if (indicesOfO === winningCombos[0] || indicesOfO === winningCombos[1] || indicesOfO === winningCombos[2] || indicesOfO === winningCombos[3] || indicesOfO === winningCombos[4] || indicesOfO === winningCombos[5] || indicesOfO === winningCombos[6] || indicesOfO === winningCombos[7]) {
    return true
  } else {
    return false
  }




  // and then push them into the empty array
  // get all of the indices of the token
  // ["X", "X", "X", "", "", "", "O", "O", ""]
  // acc = [], el = "X", i = 0 => [0]
  // acc = 0, el = "X", i = 1 => [0, 1]
  // acc = 1, el = "X", i = 2 => [0, 1, 2]
}


function setMessage(string) {
  const messageDiv = document.getElementById('message').innerHTML = string
}

function doTurn(square) {
  updateState(square)
  turn++
  checkWinner()
  setMessage()
}










// Code your JavaScript / jQuery solution here
