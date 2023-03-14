import Pusher from "pusher-js";
import { Message_url } from "./helper";
let token = localStorage.getItem('accesstoken');
  const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: 'mt1',
    authEndpoint: Message_url + '/auth',
    auth: {
        params: {
            user_id: localStorage.getItem('user_id'),
           
          },
      headers: {
        'authorization':  token
      }
    },
    encrypted: true
})
// Pusher.log = function(msg) {
//     console.log(msg);
//   };
  var channel = pusher.subscribe('my-channel');

  export {channel}