function articlePage(i){
  console.log("i", i);

  fetch('/read',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ i }),
  })
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
      console.log('Server response:', data);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}