import { Carousel } from "react-bootstrap";
import "./CarouselImage.scss"
import { useEffect,useState } from "react";
function CarouselImage() {
  const [mediaSrc, setMediaSrc] = useState('');
  useEffect(()=>{
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    if (screenWidth >= 768) {
      // Điều kiện cho màn hình PC
      setMediaSrc('pc_image.jpg');
    } else {
      // Điều kiện cho màn hình mobile
      setMediaSrc('mobile_image.jpg');
    }
  })
    const linkImg = [
      {
        pc:"combo-dinner_pc.webp",
        mobile:"combo-dinner_mobile.webp"
      },
      {
        pc:"GaCuonBK_pc.webp",
        mobile:"GaCuonBK_mobile.jpg"
      },
      ,{
        pc:"GaDiaTrungHai_pc.webp",
        mobile:"GaDiaTrungHai_mobile.webp"
      }
      ,{
        pc:"GaQueKem_pc.webp",
        mobile:"GaQueKem_mobile.webp"
      }
      ,{
        pc:"GiangSinh_pc.webp",
        mobile:"GiangSinh_mb.webp"
      }
    ]
  return (
    <Carousel>
    {linkImg && linkImg.length > 0 && linkImg.map((item,index)=>{
      return(
        <Carousel.Item interval={500}>
        <picture class="ng-star-inserted">
        <source className="carousel" media="(max-width: 768px)" type="image/webp" srcset={`/images/Carousel/PC/${item.mobile}`}/>
        {/* <source media="(min-width: 768px)" type="image/jpeg" srcset="https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/GaQueKem.jpg?v=3QjVqL"/>
        <source media="(max-width: 767px)" type="image/webp" srcset="https://static.kfcvietnam.com.vn/images/content/home/carousel/xs/GaQueKem.webp?v=3QjVqL"/>
        <source media="(max-width: 767px)" type="image/jpeg" srcset="https://static.kfcvietnam.com.vn/images/content/home/carousel/xs/GaQueKem.jpg?v=3QjVqL"/> */}
        <img loading="lazy" src={`/images/Carousel/PC/${item.pc}`} alt="undefined"/>
        </picture>  
      </Carousel.Item>
      )
    })}
      
    </Carousel>
  );
}

export default CarouselImage;