import { media_url } from '../helper'
import Http from '../Http'
export const upload_img = (formData)=>{

    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(media_url+'/upload_file',formData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}



