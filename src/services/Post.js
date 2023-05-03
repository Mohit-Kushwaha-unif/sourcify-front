import { post_url } from '../helper'
import Http from '../Http'

export const addPost = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(post_url+'/addPost',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const getByIdPost = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(post_url+'/getByIdPost',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const updatePost = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(post_url+'/updatePost',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const publishPost = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(post_url+'/publishPost',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}

export const DeletePost = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(post_url+'/DeletePost',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}
export const getPost = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(post_url+'/getPost',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}

