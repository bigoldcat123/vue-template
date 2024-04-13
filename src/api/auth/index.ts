import server from ".."
class  Auth<T> {

    daoLogin(daoLoginUser:DaoLoginUser) {
        return server.post<T>('login',daoLoginUser,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
    }
    mailLogin(mailLoginUser:MailLoginUser) {
        return server.post<T>('login')
    }
    logout() {
        return server.post('logout')
    }
}
export default new Auth<ResponseData>()
