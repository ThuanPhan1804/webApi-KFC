import CardInvoice from "./CardInvoice";
import "./ListInvoice.scss"
const ListInvoice = ({data}) =>{
    return(<>
            {data && data.length > 0 && (
                data.map((item,index)=>{
                    return <CardInvoice data={item}/>
                })
            )}
    </>)
}
export default ListInvoice;