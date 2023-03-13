import { category_url } from '../helper'
import Http from '../Http'

export const add_category = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(category_url+'/add_category',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const update_category = (formValue)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.patch(category_url+'/update_category',formValue).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const get_category = ()=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(category_url+'/get_category').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const get_category_by_id = (id)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(category_url+'/get_category/'+id).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}

export const delete_category = (formvalue)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.delete(category_url+'/remove_category',formvalue).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}