import axios from "axios"

export const COMMON_API=async(httpRequestMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpRequestMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then((res)=>{return res}).catch((err)=>{return err})
}