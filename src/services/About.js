import { About_url } from '../helper'
import Http from '../Http'

export const add_about = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(About_url+'/add_Aboutus',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const get_about = ()=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(About_url+'/get_Aboutus').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const update_about = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.patch(About_url+'/update_Aboutus',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
