import {createContext,useContext,useState} from "react"


type Props = {
    children:string | JSX.Element | JSX.Element[]
}

type User = {
    username:string,
    email:string,
}

type Auth = {
    user: User | null,
    login:()=> void,
    register:()=> void
}

const initialValue:Auth = {
    user: null,
    login:()=>{},
    register:()=>{}
}

const AuthContext = createContext<Auth>(initialValue)


export const AuthProvider = ({children}:Props)=>{
    const [user] = useState<null | User>(null)

    const login = ()=>{}
    const register = ()=>{}

    const value = {
        user,
        login,
        register
    }
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
}


export const useAuth = ():Auth => {
    const {user,login,register} = useContext(AuthContext)
    return {user,login,register}
}