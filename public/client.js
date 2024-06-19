
function publish(){

    let title = document.getElementById("inputTitle").value;
    let text = document.getElementById("text").value;
    console.log(title, text);

    const dataToSend = {
        key1: title,
        key2: text,
      };
      
      fetch('/your-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

}



