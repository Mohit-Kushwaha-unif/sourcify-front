import { contractor_url } from '../helper'
import Http from '../Http'
export const add_contractor = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(contractor_url+'/add_contractor',formData).then((res)=>{

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
            Http.patch(contractor_url+'/update_contractor',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}


export const get_contractor = (category)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            var categories = []

            if(category==undefined || categories ==null){
                category = []
            }
            else{
                categories.push(category)
            }
           
            Http.post(contractor_url+'/get_contractor',{"category":categories}).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const get_contractorBy_id = (_id)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(contractor_url+'/get_contractor/'+_id).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}
export const remove_contractor = (_id)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(contractor_url+'/remove_contractor').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}
