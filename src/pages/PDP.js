
import React,{useEffect,useState} from 'react';
import ImageSlider from '../components/ImageSlider/imageSlider.js'
import ProductInfo from '../components/ProductInfo/ProductInfo.js'

import './PDP.css';

function PDP(props) {

  const [images, setimages] = useState([]);
  const [sizes, setsizes] = useState([]);
  const [title, settitle] = useState([]);

  useEffect(() => {

    let urlValue = window.location.href;
    urlValue = urlValue.split('/vdiet');
      let pid = urlValue[urlValue.length - 1].split("=");
       let productId = pid[pid.length - 1]
  fetch(`https://supertails-backend.el.r.appspot.com/product/vdiet/${productId}`)
   .then(response => {
    return response.json();
  })
  .then(data => {
    console.log("data");
    console.log(data);
    setimages(data.response.images);
    let sizesData = data?.response?.variants?.map(size => {
      return {
        "title": size?.title,
        "variantId": size?.id,
        "productId": size?.product_id,
        "price": size?.price ?? 0,
        "mrpPrice": size?.compare_at_price ?? 0
      };
    });
    console.log("sizesData");
    console.log(sizesData);
    settitle(data?.response?.title ?? "")
    setsizes(sizesData);
  })
  }, []);


  return (
    <div className="pdp">
       <ImageSlider images={images} />
       <ProductInfo title={title} sizesData={sizes}/>
    </div>
  );
}

export default PDP;
