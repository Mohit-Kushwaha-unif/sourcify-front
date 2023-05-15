import { FeedBack_url } from '../helper'
import Http from '../Http'

export const add_feedback = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(FeedBack_url+'/add_feedback',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const get_feedback = ()=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(FeedBack_url+'/get_feedback').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const get_feedbackByid = (id)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(FeedBack_url+'/getFeedBackById/'+id).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const removeFeedBackById = (id)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.delete(FeedBack_url+'/removeFeedBackById/'+id).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}