import { listing_url } from '../helper'
import Http from '../Http'
export const add_listing = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(listing_url+'/add_listing',formData).then((res)=>{
                console.log(res.data)
                // localStorage.setItem("lisiting_id", res.data.listing._id)
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const update_listing = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.patch(listing_url+'/update_listing',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}


export const get_listing = (category)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            console.log({category})
            var categories =[]
            if(category===undefined || category===null){
                categories=[]
            }
            else{
                categories.push(category)
            }
            Http.post(listing_url+'/get_listing',{"category":categories}).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const get_listingBy_id = (_id)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(listing_url+'/get_listing/'+_id).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}
export const remove_listing = (_id)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(listing_url+'/remove_listing').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}
export const get_listing_user = (_id)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(listing_url+'/get_listing_user/'+_id).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}