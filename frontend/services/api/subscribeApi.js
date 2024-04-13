import axios from 'axios';
import { subscribeURLbuildr } from '../url-builder/url-builder';


const subscribe = async(email, username, userId, channel , timestamp) => {
    const url = subscribeURLbuildr();
    try{
        const response = await axios.post(url, {
            email: email,
            username: username,
            userId: userId,
            channel: channel,
            timestamp: timestamp
        },{
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        
        });

        if(response.status === 200){
            console.log("mono randi")
            return response.data;   
        }
    }catch(error){
        console.log(email, username, userId, channel, timestamp)
        console.error('Error subscribing:', error);
        throw error.response.data;
    }
}

export default subscribe
