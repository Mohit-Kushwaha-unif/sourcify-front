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