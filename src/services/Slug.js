import { Slug_url } from '../helper'
import Http from '../Http'
export const add_slug = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(Slug_url+'/add_Slug',formData).then((res)=>{
                if(res.status !== 400){
                    localStorage.setItem("isSlug", true)
                  }
                console.log(res)
                // localStorage.setItem("lisiting_id", res.data.listing._id)
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const get_slug = ()=>{

    return ()=>
        new Promise((resolve,reject)=>{

            Http.get(Slug_url+'/get_slug').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
