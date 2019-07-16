import api from '../api/api'
export default {
    loggin:()=>{
        return new Promise ((resolve,reject)=>{
            wx.login({
                success: loginRet => {
                    wx.request({
                        url: `${ api.sign_in }`,
                        method: 'POST',
                        dataType:'json',
                        header:{
                            Accept : 'application/vnd.houzz.v1+json',
                            // SandBox : true
                        },
                        data: {
                            code : loginRet.code,
                        },
                        success: (res) => {
                            resolve(res)
                        },
                        fail: (err) => {
                            reject(err)
                        }
                    })
                }
            });
        })
    }
}