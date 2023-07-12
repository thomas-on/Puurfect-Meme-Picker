import { catsData } from '/data.js'

const emotionRadios = document.getElementById("emotion-radios")
const getImageBtn = document.getElementById("get-image-btn") 
const gifsOnlyOption = document.getElementById("gifs-only-option") 
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption) //functioncall without ()

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e) {
    // Get an array of all utems with "radio" class
    const radios = document.getElementsByClassName("radio")
    // Iterate over radios array to remove all highlights
    for (let radio of radios) {
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function closeModal() {
    memeModal.style.display = "none"
}

function renderCat() {
    const catObject = getSingleCatObject() // Get a catObject and store it
    
    // Create the HTML string
    memeModalInner.innerHTML = `
                                <img
                                    class="cat-img"
                                    src="./images/${catObject.image}"
                                    alt="${catObject.alt}"
                                >
                                `
                                
    memeModal.style.display = "flex" // set display to flex to display it
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    
    if (catsArray.length === 1) {
        return catsArray[0]
    }
    else {
        const randomChoice = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomChoice]
    }
}

function getMatchingCatsArray() {
    if (document.querySelector('input[type="radio"]:checked')) { 
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat) {
            // If gif checkbox is checked, select those matching emotion and has gifs
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif === true
            }
            // Otherwise just return all with matching emotions
            else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

function getEmotionsArray(cats){
    const emotionArray = [] // Initialise an empty array to store the emotions
    
    // For loop to iterate over each cat object in catsData
    for (let cat of cats) {
        //console.log(cat.emotionTags)
        // For loop to iterate over each emotion in emotionTags
        for (let emotion of cat.emotionTags) {
            if (!emotionArray.includes(emotion)) { // If emotionArray does not include emotion 
                emotionArray.push(emotion) // Push each emotion into emotionArray
            }
        }
    } 
   return emotionArray
}

// console.log(getEmotionsArray(catsData))

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    //console.log(emotions)
    
    let radioItems = ""
    
    for (let emotion of emotions) {
        radioItems += `
            <div class="radio">
            <label for="${emotion}">${emotion}</label>
		        <input 
                    type="radio" 
                    id=${emotion}
                    value=${emotion} 
                    name="emotions" 
                >
	        </div>
            `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)