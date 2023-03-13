import { social_url } from '../helper'
import Http from '../Http'


   
export const googleLogin = (formdata)=>{

    return ()=>
        new Promise((resolve,reject)=>{

            Http.post(social_url+'/google',formdata).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}
