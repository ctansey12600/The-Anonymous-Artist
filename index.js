//Open/close Menu
document.querySelector("#open-btn").addEventListener("click", () => {
    const navBar = document.querySelector(".links")
    navBar.style.display = "block"
    document.querySelector("#open-btn").style.display = "none"
})

document.querySelector("#close").addEventListener("click", () => {
    const navBar = document.querySelector(".links")
    navBar.style.display = "none"
    document.querySelector("#open-btn").style.display = "block"
})

//Fetching Artwork
function fetchArtwork(){
    fetch("http://localhost:3000/artwork")
    .then(res => res.json())
    .then(collection => collection.forEach(artwork => artworkCard(artwork)))
}
fetchArtwork()

//Building Artwork Card
function artworkCard(artwork){
    let card = document.createElement('section')
    card.className = "card"
    card.innerHTML = `
    <div class="artwork">
    <div class="image">
        <img src=${artwork.image}>
        <div class="layer">
            <h3>${artwork.name}</h3>
        </div>
    </div>
    </div>
    <div class="btns">
        <div class="row">
            <div class="col">
                <h4 id="like-btn" class="card-btn"><i class="fas fa-heart"></i> ${artwork.likes}</h4>
            </div>
            <div class="col">
                <h4 id="buy-btn" class="card-btn">BUY</h4>
            </div>
        </div>
    </div>
    </section>
    `
    //functional like btn
    card.querySelector("#like-btn").addEventListener("click", () => {
        let num = parseInt(card.querySelector("#like-btn").innerText)
        card.querySelector("#like-btn").innerHTML = `<i class="fas fa-heart"></i> ${num + 1}`
        addLikes(artwork,num)
    })
    
    //function buy btn
    card.querySelector("#buy-btn").addEventListener("click", () => {
        card.remove()
        deleteArtwork(artwork.id)
    })

    document.getElementById('card-placement').append(card)
}

//Adding New Artwork
document.getElementById("new-artwork").addEventListener('submit', addNew)
function addNew(e) {
    const newName = e.target[0].value
    const newUrl = e.target[1].value
    fetch("http://localhost:3000/artwork", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify({
            name: newName,
            image: newUrl,
            likes: 0,
        })
    })
    document.getElementById("new-artwork").reset()
}

//Deletes when bought
function deleteArtwork(id){
    fetch(`http://localhost:3000/artwork/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
            "accept": "application/json"
        }
    })
}

//Addes Likes 
function addLikes(artwork,num){
    fetch(`http://localhost:3000/artwork/${artwork.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
           "accept": "application/json"
       },
        body: JSON.stringify({
                likes : num + 1
        })
    })
}