require('isomorphic-fetch');
// Use request mocking service
// Type:
// response.body = request.body
// Inside "Reponse Builder" body in order to get echo service
const url = 'http://putsreq.com/tMWywrJmJsOX4lbvND9b';
// Visit http://putsreq.com/tMWywrJmJsOX4lbvND9b/inspect to view your requests 
// use some non-existing url to see errors
//const url = 'http://localhost:3000/404';

export const submitForm = (data, resolve, reject) => fetch(url, {
    method: 'POST',
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log(response);
    if (response.status > 400) {
      // redux-form expects Promise reject to set submitFailed to true
      reject({firstName: 'invalid'}); // mimic invalid firstName field
    } else {
      let json = response.json();
      // redux-form expects Promise resolution to set submitting state to false
      resolve(json);
      return json;
    }
  })
