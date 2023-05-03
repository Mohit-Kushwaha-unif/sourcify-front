
  
  function sendSubscription(id,subscription, title, message) {
    return fetch("http://localhost:5000/post/publishPost", {
      method: "POST",
      body: JSON.stringify({ id,subscription, title, message }),
      headers: {
        "content-type": "application/json",
      },
    });
  }

  export default sendSubscription