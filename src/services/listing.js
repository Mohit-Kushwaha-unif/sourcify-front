import { listing_url } from '../helper'
import Http from '../Http'
export const add_contractor = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(listing_url+'/add_listing',formData).then((res)=>{

                localStorage.setItem("form_id", res.data.user_data._id)
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const update_contractor = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.patch(listing_url+'/update_listing',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}


export const get_contractor = ()=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(listing_url+'/get_listing').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const get_contractorBy_id = (_id)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(listing_url+'/get_listing/'+_id).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}
export const remove_contractor = (_id)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(listing_url+'/remove_listing').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}