import { carausel_url } from '../helper'
import Http from '../Http'

export const add_carausel = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(carausel_url+'/add_carausel',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const update_carausel = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.patch(carausel_url+'/update_carausel',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const get_carausel = ()=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(carausel_url+'/get_carausel').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const caraosuelById = (form)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(carausel_url+'/caraosuelById',form).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}