
import {checkUrlValid} from './UserUrlValidator'
const form = document.getElementById('webAddForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const clientURL = document.getElementById('name').value;
      if(checkUrlValid(clientURL)){
        submitAddToServer('/api', { url : clientURL })
        .then(function (reso) {
            console.log("Server Response now ", reso)
       
            document.getElementById("polarity_txt").innerHTML = "polarity : " + reso.score_tag;
            document.getElementById("agreement_txt").innerHTML = "agreement : " + reso.agreement;
            document.getElementById("subjectivity_txt").innerHTML = "subjectivity : " + reso.subjectivity;
            document.getElementById("confidence_txt").innerHTML = "confidence : " + reso.confidence;
            document.getElementById("snippet_txt").innerHTML = "snippet : " + reso.innerHTML;
            

        })

      }
      else{
        alert("Inter a valid URL Address with format >>>  http://example.com ")
      }
    
}

const submitAddToServer = async (url = "", data = {}) => {
    console.log('analyzing now :' , data)
    try{
        const responce_data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : '/application/json',
            },
   
    body: JSON.stringify(data)
})
return responce_data.JSON();
    }
    catch(error){
        throw error;
    }
}

export { handleSubmit };

