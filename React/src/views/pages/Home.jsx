import { useEffect, useState } from "react";
import Banner from "../../components/Banner/Banner";
import CarouselImage from "../../components/Carousel/CarouselImage";
import ListProduct from "../../components/Product/ListProduct";
import axios from "axios";
import ListCardClassification from "../../components/Classification/ListCardClassification";
const Home = () => {
    const [products,setProducts] = useState([])
    // useEffect(()=>{
    //     axios.get("http://localhost:3000/products")
    //     .then((res)=>{
    //         setProducts(res.data);
    //     })
    // },[])
    // console.log(products);
    useEffect(()=>{
        return () =>{
            
        }
    })
    return(
        <>
            <Banner/>
            <CarouselImage/>
            <ListCardClassification className="container"/>
        </>
        )
}
export default Home;