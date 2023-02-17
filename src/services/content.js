import { content_url } from '../helper'
import Http from '../Http'

export const add_content = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(content_url+'/add_content',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const update_content = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.patch(content_url+'/update_content',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const get_content = ()=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(content_url+'/get_content').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}