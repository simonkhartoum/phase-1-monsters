const addMonsterCard = document.querySelector('#create-monster')
const monstersListCard = document.querySelector('#monster-container')
const previousPage = document.querySelector('#back')
const nextPage = document.querySelector('#forward')
let page = 1

document.addEventListener('DOMContentLoaded', () => {
  renderMonsterForm()
  fetchMonsters()
  const monsterForm = document.querySelector('#add-monster-form')
  monsterForm.addEventListener('submit', addNewMonster)
  previousPage.addEventListener('click', movePageDown)
  nextPage.addEventListener('click', movePageUp)
})

let renderMonsterForm = () => {
  addMonsterCard.innerHTML =
    `<form id="add-monster-form">` +
    `<h3>Add Monster Here</h3>` +
    `<input type="text" name="name" placeholder="Monster's name..." id="monster-name" />` +
    `<input type="number" name="age" placeholder="Monster's age..." id="monster-age" />` +
    `<input type="text" name="description" placeholder="Monster's description..." id="monster-description" />` +
    `<input type="submit" value="Add Monster" id="monster-age" />` +
    `</form>`
}

// Fetches the monster details / info using the url provided.
let fetchMonsters = () => {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then((resp) => resp.json())
    .then((monsters) => {
      renderMonsterDetails(monsters)
    })
}

// Renders monster details for each retrieved monster from the response
let renderMonsterDetails = (monsters) => {
  monsters.forEach((monster) => {
    createMonsterDetailsElement(monster)
  })
}

// Creates the card and it's child elements as well as interpolates the specific monster's details
let createMonsterDetailsElement = (monster) => {
  const monsterCard = document.createElement('div')
  monstersListCard.appendChild(monsterCard)
  monsterCard.innerHTML =
    `<h3>${monster.name}</h3>` +
    `<small>Age : ${monster.age}</small>` +
    `<p>${monster.description}</p>`
}

// Adds a new monster to our list of monsters after providing a name, age and a description
let addNewMonster = (e) => {
  e.preventDefault()
  let monsterName = document.querySelector('[name="name"]').value
  let monsterAge = document.querySelector('[name="age"]').value
  let monsterDescription = document.querySelector('[name="description"]').value

  const newMonster = {
    name: monsterName,
    age: monsterAge,
    description: monsterDescription,
  }

  // The configurationObject contains three core components that are needed for standard POST requests: the HTTP verb, the headers, and the body.
  const configurationObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    // By passing an object in, JSON.stringify() will return a string.
    body: JSON.stringify(newMonster),
  }

  return fetch('http://localhost:3000/monsters', configurationObject)
    .then((resp) => resp.json())
    .then((monster) => {
      createMonsterDetailsElement(monster)
    })
    .catch((error) => {
      alert('Error Adding New Monster!')
    })
}

let movePageUp = () => {
  page += 1
}

let movePageDown = () => {
  page -= 1
}