import server from ".."
class  Auth<T> {

    daoLogin(daoLoginUser:DaoLoginUser) {
        return server.post<T>('login',daoLoginUser,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
    }
    getMailCode(email:string) {
        return server.get('mailcode', {params: {email}})
    }
    mailLogin(mailLoginUser:MailLoginUser) {
        return server.post<T>('mailcode',mailLoginUser,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
    logout() {
        return server.post('logout')
    }
}
export default new Auth<ResponseData>()
