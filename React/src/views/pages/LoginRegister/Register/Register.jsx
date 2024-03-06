import FormRegister from "../../../../components/Register/FormRegister"
const Register=()=>{
    return(
        <div className="page-register container">
        <div className="page-register-top container">
            <FormRegister/>
        </div>    
        <div className="page-register-left">
        <img src="/images/register.jpg"/>
        </div>
        <div className="page-register-right container">
            <FormRegister/>
        </div>
    </div>
    )
}
export default Register