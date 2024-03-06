import { Outlet } from "react-router-dom";
import Header from "../../components/Outlet/Header"
import Footer from "../../components/Outlet/Footer";
const KFCTabs = () =>{
    return(
        <>
            <div className="img-fluid">
            <img src="https://static.kfcvietnam.com.vn/images/web/our-story/lg/our-story.jpg?v=30VQW4" />
            </div>
            <Outlet/>
        </>
    )
}
export default KFCTabs;