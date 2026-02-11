export function getJwtToken(){
    const token = localStorage.getItem("token")
    return token
}

export function setJwtToken(jwt: string){
    const token = localStorage.setItem("token", jwt);
    return token
}