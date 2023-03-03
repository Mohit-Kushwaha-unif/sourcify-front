import { Message_url } from '../helper'
import Http from '../Http'

export const send_message = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(Message_url+'/sendMessage',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const allMessage = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(Message_url+'/allMessage',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const getContacts = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(Message_url+'/allContacts',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}

