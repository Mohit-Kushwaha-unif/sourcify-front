import { db_url } from '../helper'
import Http from '../Http'


export const search_db = (fromData)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(db_url+'/search?q='+fromData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}

export const adminSearch = (fromData)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(db_url+'/db_Search',fromData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}
