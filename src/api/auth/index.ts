import server from ".."
export function daoLogin(daoLoginUser:DaoLoginUser) {
    return server.post('login')
}

export function mailLogin(mailLoginUser:MailLoginUser) {
    return server.post('login')
}