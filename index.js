const monsterContainer = document.getElementById("monster-container")
const btnBox = document.getElementById("btn-box")
const monsterForm = document.getElementById("monster-form")

let pageNumber = 1
let maxPageNumber

function setMaxPage() {
  fetch(`http://localhost:3000/monsters`)
  .then(response => {
    return response.json()
  })
  .then(data => {
    maxPageNumber = Math.ceil(data.length / 50)
  })
}

function fetchMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50/&_page=${pageNumber}`)
  .then(response => {
    return response.json()
  })
  .then(data => {
    monsterContainer.innerHTML = ""
    data.forEach(monster => {
      monsterContainer.innerHTML += `
      <div data-id="${monster.id}" class="monster">
        <h2>${monster.name}</h2>
        <p><strong>Age:</strong> ${monster.age}</p>
        <p><strong>Bio:</strong> ${monster.bio}</p>
      </div>
      `
    })
  })
}

function nextPage() {
  if (pageNumber < maxPageNumber) {
    pageNumber++
    fetchMonsters()
  }
}

function previousPage() {
  if (pageNumber > 1) {
    pageNumber -= 1
    fetchMonsters()
  }
}

btnBox.addEventListener("click", e => {
  if (e.target.id === "forward") {
    nextPage()
  } else if (e.target.id === "back") {
    previousPage()
  }
})

monsterForm.addEventListener("submit", e => {
  e.preventDefault()
  const newName = monsterForm.querySelector("#new-monster-name").value
  const newAge = monsterForm.querySelector("#new-monster-age").value
  const newBio = monsterForm.querySelector("#new-monster-bio").value

  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newName,
      age: newAge,
      bio: newBio
    })
  })
  .then(response => {
    monsterForm.reset()
    setMaxPage()
  })
})

setMaxPage()
fetchMonsters()
