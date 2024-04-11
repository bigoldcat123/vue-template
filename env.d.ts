/// <reference types="vite/client" />

declare type UserDetail = {
    name: string
}

declare type CurrentUser = {
    token:string,
    detail:UserDetail
}

declare type DaoLoginUser = {
    username: string
    password: string
}
declare type MailLoginUser = {
    mail: string
    code: string
}