import React, { useState, useRef, useEffect } from 'react';
import AppmakerWebSdk from '@appmaker-xyz/web-sdk';
import './ProductInfo.css';
import QuantityPicker from './subComponents/quantityPicker/QuantityPicker.js';
import storage from '../../firebase';



const ProductInfo = () => {
  const [selectedSize, setSelectedSize] = useState({});

  const [Sizes, setSizes] = useState([]);
  const [qty, setQty] = useState(1);
  const [title, setTitle] = useState("");


  const [uploaded, setUploaded] = useState(false);
  const [noPres, setNoPres] = useState(false);
  const [uploadedLink, setUploadedLink] = useState("false");

  const fileInputRef = useRef(null);

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
        let sizesData = data?.response?.variants?.map(size => {
          return {
            "title": size?.title,
            "variantId": size?.id,
            "productId": size?.product_id,
            "price": size?.price ?? 0,
            "mrpPrice": size?.compare_at_price ?? 0
          };
        });
        setTitle(data?.response?.title ?? "")
        setSizes(sizesData);
        setSelectedSize(sizesData[0]);
      })
  }, []);


  const handleFileChange = async (e) => {
    handleUpload(e.target.files[0]);
  };

  const handleUpload = (image) => {
    if (!image) return;
    storage
      .ref(`/images/${image.name}`)
      .put(image)
      .on(
        'state_changed',
        null,
        (error) => {
          console.error(error);
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((downloadUrl) => {
              setUploadedLink(downloadUrl);
              setUploaded(true)
            })
            .catch((error) => {
              console.error('Error getting download URL:', error);
            });
        }
      );
  };


  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleQuantityChange = (value) => {
    setQty(value ?? 1)
  };

  const addToCart = (value) => {
    const customAttributes = [
      {
        "key": "prescription Url",
        "value": uploadedLink
      }
    ]
    const variant = {
      id: `gid://shopify/ProductVariant/${selectedSize.variantId}`,
    }
    const product = {
      id: `gid://shopify/Product/${selectedSize.productId}`,
    }
    console.log({ product: product, variant: variant, quantity: qty, customAttributes: customAttributes });

    AppmakerWebSdk.addProductToCart({ product: product, variant: variant, quantity: qty, customAttributes: customAttributes }); // make sure to pass the values to its respective keys    
    AppmakerWebSdk.showMessage({ title: "Added To Cart" });


  }

  const ViewCart = () => {
    //  const customAttributes = []

    // const variant = {
    //   id: `gid://shopify/ProductVariant/${selectedSize.variantId}`,
    // }
    // const product = {
    //   id: `gid://shopify/Product/${selectedSize.productId}`,
    // }

    // AppmakerWebSdk.addProductToCart({ product: product, variant: variant, quantity: qty, customAttributes: customAttributes }); // make sure to pass the values to its respective keys
    // console.log({ product: product, variant: variant, quantity: qty, customAttributes: customAttributes });
    // AppmakerWebSdk.showMessage({ title: "Added To Cart" });
    AppmakerWebSdk.openCart();
  }

  return (
    <div className="main_div">
      <div className="product_title">
        {title}
      </div>
      <div className='row1'>

        <div className="product_size" style={{ marginRight: "10px" }}>
          Size
        </div>
        <div className='rowcss'>
          {Sizes.map((size, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedSize(size)
              }} className="product_size_box" style={{ border: selectedSize?.title === size?.title ? '3px solid green' : '1px solid black' }}>
              {size.title}
            </div>
          ))}
        </div>
      </div>
      <div className='row1'>
        <div className="product_size">
          Quantity
        </div>
        <QuantityPicker min={1} max={10} initialValue={1} onQuantityChange={handleQuantityChange} />
      </div>
      <div className="rowcssPI">
        <div className="product_price">
          ₹{selectedSize?.price ?? ""}
        </div>
        <div className="product_mrp_price">
          ₹{selectedSize?.mrpPrice ?? ""}

        </div>
      </div>
      <img className='product-icon-wraper' src={"https://cdn.shopify.com/s/files/1/0565/8021/0861/files/Screenshot_2023-07-30_at_9.32.45_AM.png?v=1690689788"}
        style={{ height: "120px" }}
      />
      <div className='row1' style={{ marginBottom: "150px", marginTop: 0 }} >
        <img style={{ marginRight: "10px",height:"16px" }} src={"https://cdn.shopify.com/s/files/1/0565/8021/0861/files/truck.png?v=1675345372"} alt={"van"} />
        <div style={{ fontSize: "13px"}}>
          Free delivery on orders above ₹699
        </div>

      </div>
      <div >
        {/* {!uploaded ?
          <div className='upload-btn-main'>
            
            <div className='AddBoth'
              onClick={ViewCart}
            >
              <div className='cbtn'>

              Continue Without Prescription

            </div>
            </div>
            <div className='upload-prec'
            >
              <div className="App center-content">
                <div className="file-input" style={{ height: "100%", width: "100%" }}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <button className="upload-button" onClick={handleButtonClick}>
                    UPLOAD PRESCRIPTION
                  </button>
                </div>
              </div>
            </div>
          </div> :
          <div
            onClick={addToCart}
            className='upload-prec' style={{ minHeight: '26px', left: 0, background: "#ef6c00", color: "#fff", borderTopLeftRadius: "10px" }}>
            ADD TO CART
          </div>} */}

        <div className='sticky-atc'>
          {uploaded ?
              <div>
              {
              noPres ?
                <div  className='rowEnd' >
                  
                <div  className='rowEnd' style={{alignItems:"flex-start" }}>
                <img style={{ marginRight: "4px",height:"24px" }} src={"https://cdn.shopify.com/s/files/1/0565/8021/0861/files/Phone_e4f7104a-9417-493c-ab0c-77f3f0e8c570.png?v=1690886330"} alt={"phone"} />

               <div style={{ fontSize: "14px" ,maxWidth:'150px'}}>
                  Our doctor will contact you after purchase!
                </div> 
                </div> 
                <div className='AddToCart' style={{height:"20px"}}
                  onClick={ViewCart}>
                  VIEW CART
                </div>
                </div> 
                :

              <div className='rowEnd'>
                <div>
                  <div  className='rowEnd' >
                  <img style={{ marginRight: "4px",height:"24px" }} src={"https://cdn.shopify.com/s/files/1/0565/8021/0861/files/Newspaper.png?v=1690886331"} alt={"paper"} />
                  <div style={{ justifyContent: "flex-start", color: "#025F02", fontWeight: 'bold' }}>
                      Prescription added
                  </div>
                  </div>
                  <div style={{ fontSize: "14px",marginLeft:"30px",textDecoration: "underline",width:"30px" }}>
                  <div className="file-input" style={{ height: "100%", width: "100%" }}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <button className="upload-button" onClick={handleButtonClick}>
                    Edit
                  </button>
                </div>
                  </div>
                </div>

                <div className='AddToCart'
                  onClick={addToCart}>
                  ADD TO CART
                </div>
              </div>}
            </div>
            :
            <div>
              <div className='AddBoth'
                onClick={() => {

                  setUploaded(true)
                  setNoPres(true)
                  const customAttributes = []

    const variant = {
      id: `gid://shopify/ProductVariant/${selectedSize.variantId}`,
    }
    const product = {
      id: `gid://shopify/Product/${selectedSize.productId}`,
    }

    AppmakerWebSdk.addProductToCart({ product: product, variant: variant, quantity: qty, customAttributes: customAttributes }); // make sure to pass the values to its respective keys
    console.log({ product: product, variant: variant, quantity: qty, customAttributes: customAttributes });
    AppmakerWebSdk.showMessage({ title: "Added To Cart" });
                }}>
                CONTINUE WITHOUT PRESCRIPTION
              </div>
              <div className="upload-btn-res center-content">
                <div className="file-input" style={{ height: "100%", width: "100%" }}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <button className="upload-button" onClick={handleButtonClick}>
                    UPLOAD PRESCRIPTION
                  </button>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;


