import { useEffect, useState } from "react";
import FormLogin from "../../../../components/Login/FormLogin";
import FormRegister from "../../../../components/Register/FormRegister";
import "./PageAccount.scss"
const PageAccount = () =>{
    const [showFormRegister,setShowFormRegister] = useState(false);
    useEffect(()=>{
        return()=>{
            
        }
    })
    return(
        <>
        <div className="page-login container">
            <div className="page-login-top container">
                <FormLogin/>
            </div>    
            <div className="page-login-left" onClick={()=>setShowFormRegister(!showFormRegister)}>
            <img src="/images/register.jpg"/>
            </div>
            <div className="page-login-right container">
            {showFormRegister ? <FormRegister setShowFormRegister={setShowFormRegister}/> : <FormLogin setShowFormRegister={setShowFormRegister}/>}
            </div>
        </div>
            
        </>
    )
}
export default PageAccount;