
import {checkUrlValid} from './UserUrlValidator'
const form = document.getElementById('webAddForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get client web adress from form 
 
    const clientURL = document.getElementById('name').value;
    
 
        // If  valid, send to server
      if(checkUrlValid(clientURL)){
        
        submitAddToServer('/api', { url : clientURL })
      
        .then(function (reso) {
            console.log("Server Response now ", reso)
            // updating 
            document.getElementById("polarity_txt").innerHTML = "polarity : " + reso.score_tag;
            document.getElementById("agreement_txt").innerHTML = "agreement : " + reso.agreement;
            document.getElementById("subjectivity_txt").innerHTML = "subjectivity : " + reso.subjectivity;
            document.getElementById("confidence_txt").innerHTML = "confidence : " + reso.confidence;
            document.getElementById("irony_txt").innerHTML = "irony : " + reso.irony;

        })

      }
      else{
        alert("Inter a valid URL Address with format >>>  http://example.com ")
      }
    
}

//  send to server all data entered and valid after checking 
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

