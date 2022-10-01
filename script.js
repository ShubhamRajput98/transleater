const selecttag = document.querySelectorAll("select"),
textform = document.querySelector(".form"),
textto = document.querySelector(".to"),
transbtn = document.querySelector(".btn button"),
exchangeIcon = document.querySelector("#exchange"),
icons = document.querySelectorAll(".box-content .icons");

selecttag.forEach((tag, id) => {
    for (const countey_code in countries) {

        let selected;
        if (id == 0 && countey_code == "en-GB") {
            selected = "selected"
        } else if (id == 1 && countey_code == "hi-IN") {
            selected = "selected"
        }
        let option = `<option value="${countey_code}" ${selected}>${countries[countey_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option) //adding option tag in select
    }
});




transbtn.addEventListener("click",()=>{
    let text = textform.value,
    transletform = selecttag[0].value,
    transletto = selecttag[1].value;

    if(!text) return

    textto.setAttribute("placeholder", "Transleting...")
    
    let apiURL = `https://api.mymemory.translated.net/get?q= ${text}&langpair=${transletform}|${transletto}`

    fetch(apiURL).then(req => req.json()).then(data =>{
        // console.log(data)
        textto.value = data.responseData.translatedText;
    })
});




exchangeIcon.addEventListener("click",()=>{
    let tempText = textform.value,
    tempselect = selecttag[0].value;

    textform.value = textto.value
    textto.value = tempText

    selecttag[0].value = selecttag[1].value
    selecttag[1].value = tempselect
})


icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
        // console.log(target)
        if(icon.classList.contains("fa-clipboard")){
            if(target.id== "form"){
                navigator.clipboard.writeText(textform.value)
            }else{
                navigator.clipboard.writeText(textto.value)
            }
        }else{
            let utterance;
            if(target.id== "form"){
                utterance = new SpeechSynthesisUtterance(textform.value)
                utterance.lang = selecttag[0].value
            }else{
                utterance = new SpeechSynthesisUtterance(textto.value)
                utterance.lang = selecttag[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})

