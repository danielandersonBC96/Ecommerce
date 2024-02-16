import React from 'react';
import "./ProductDisplay.css";
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png'


export const ProductDisplay = (props) => {
    const { product } = props;
    console.log( product)
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
             
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img ' src={product.image} alt=''/> 
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_icon} alt=''/>
                    <img src={star_dull_icon} alt=''/>
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, libero officiis! Iste quas dolor dolorem adipisci perspiciatis aliquid delectus eveniet reprehenderit repellendus laudantium optio velit suscipit, ipsam est nobis a.</p>
                </div>

                <h1> Seletec Size </h1>
                <div className="productdisplay-right-size">
                   
                     <div className="productdisplay-right-size">
                

                         <div>S</div>
                         <div>M</div>
                         <div>L</div>
                         <div>XL</div>
                         <div>XXL</div>
                     </div>
                </div>
                <button>Add Cart</button>
                <p className='productdisplay-right-category'>Category : <span> {product.category}</span></p>
            </div>
        </div>
    );
    }