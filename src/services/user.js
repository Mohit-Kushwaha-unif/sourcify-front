import { user_url } from '../helper'
import Http from '../Http'

export const register = (fromdata)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(user_url+'/register',fromdata).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const logout = (fromdata)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(user_url+'logout',fromdata).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const update_user = (fromdata)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            console.log(fromdata)
            Http.post(user_url+'update_user',fromdata).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const get_user_info = (fromdata)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            console.log(fromdata)
            Http.post(user_url+'infor',fromdata).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
export const login = (fromdata)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            console.log(fromdata)
            Http.post(user_url+'login',fromdata).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}