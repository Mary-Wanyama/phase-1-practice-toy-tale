let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

    const toys = 'http://localhost:3000/toys'
    fetch(toys)
    .then(res => res.json())
    .then(data => renderToys(data))
    function renderToys(toys) {
      toys.forEach(toy=>{
        const card = document.createElement('div')
        card.className = 'card'
        const h4 = document.createElement('h2')
        h4.innerText = toy.name
        card.appendChild(h4)
        const img = document.createElement('img')
        img.id = 'toy-header img'
        img.className = 'toy-avatar'
        img.src = toy.image
        card.appendChild(img)
        const p = document.createElement('p')
        p.innerText = `${toy.likes} likes`
        card.appendChild(p)
        const btn = document.createElement('button')
        btn.id = `id`
        btn.innerText = 'like'
        card.appendChild(btn)
        console.log(card)
        const div = document.querySelector('#toy-collection')
        div.appendChild(card)
        btn.addEventListener('click', (e) => {
          console.log(e.target.dataset);
          likes(e)
        })
      })
    }
    document.querySelector('#new-toy-btn').addEventListener('submit', function (event) {
      event.preventDefault()
      let add = {
        name: document.querySelector('.input-text').value,
        image : document.querySelector('#imageUrl').value
      }
      renderToys(add)
      addToys(add)
    })
    function addToys(add) {
      fetch(
        'http://localhost:3000/toys', {
          method : 'POST',
          header :{
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
             'name' : toy.name.value,
             'image' : toy.image.value,
             'likes' : 0
})
        }
      )
      .then(resp => resp.json())
      .then(data => renderToys(data))
    }

    function likes(e) {
      e.preventDefault()
      let more = parseInt(e.target.previousElementSibling.innerText) + 1
    
      fetch(`http://localhost:3000/toys/${e.target.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
    
          },
          body: JSON.stringify({
            "likes": more
          })
        })
        .then(res => res.json())
        .then((like_obj => {
          e.target.previousElementSibling.innerText = `${more} likes`;
        }))
    }

    
});