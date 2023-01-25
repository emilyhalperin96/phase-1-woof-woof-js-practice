const dogBar = document.querySelector('#dog-bar');

function getPupData() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(pups => renderPupData(pups))
}

function renderPupData(pups) {
    pups.forEach(pup => {
        const nameSpan = document.createElement('span');
        nameSpan.textContent = pup.name;
        dogBar.append(nameSpan)
        nameSpan.addEventListener('click',(e)=> showDogDetails(pup) )
    })
}

function showDogDetails(pup){
    const dogInfo = document.querySelector("#dog-info")
    dogInfo.innerHTML = ""
    const dogName = document.createElement('h2')
    dogName.textContent = pup.name
    const dogImg = document.createElement('img')
    dogImg.src = pup.image
    
    
    const isGoodDog = pup.isGoodDog
    const goodDogBtn = document.createElement('button')
    if (isGoodDog){
        goodDogBtn.textContent = "Good Dog!"
    }
    else{
        goodDogBtn.textContent = "Bad Dog!"
    }
    
    goodDogBtn.addEventListener('click',(e)=> toggleGoodDog(pup))
    
    dogInfo.append(dogName)
    dogInfo.append(dogImg)
    dogInfo.append(goodDogBtn)
}

function toggleGoodDog(pup){
    pup.isGoodDog = !pup.isGoodDog
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(pup)
    }
          )
    .then(resp => resp.json())
    .then(newPup => showDogDetails(newPup))
}

function toggleButton() {
const goodDogFilter = document.querySelector('#good-dog-filter')

goodDogFilter.addEventListener('click', (e) => {
    const currentState = goodDogFilter.textContent

    if (currentState === 'Filter good dogs: OFF') {
        goodDogFilter.textContent = 'Filter good dogs: ON'

        ///getDogs().then(dogArray => addAllDogsToDogBar(dogArray))

        //////
        ///const dogBar
    } 
    else if (currentState === 'Filter good dogs: ON') {
        goodDogFilter.textContent = 'Filter good dogs: OFF'


        ///////getDogs().then(dogArray => addAllDogsToDogBar(dogArray, true))
    }
})
}

toggleButton();


getPupData();
