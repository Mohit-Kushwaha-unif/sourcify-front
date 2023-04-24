import { user_url, vendor_url } from '../helper'
import Http from '../Http'

export const Add_Vendor = (formdata)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.post(vendor_url+'/add_vendor',formdata).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const get_Vendor = ()=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(vendor_url+'/get_Vendor').then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
    
}

export const get_Vendor_by_id = (id)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(vendor_url+'/get_Vendor/'+id).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}

export const update_vendor = (formValue)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.patch(vendor_url+'/update_vendor',formValue).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err)
            })
        })
}

export const search_vendor = (fromData)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.get(vendor_url+'/search_vendor/?search='+fromData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}
export const remove_vendor = (fromData)=>{
    return ()=>
        new Promise((resolve,reject)=>{
            Http.delete(vendor_url+'/remove_vendor'+fromData).then((res)=>{
                return resolve(res.data)
            }).catch((err)=>{
                return reject(err);
            })
        })
    
}