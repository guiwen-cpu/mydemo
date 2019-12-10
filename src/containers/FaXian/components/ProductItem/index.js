import React, { Component } from 'react';
import "./style.css"
class ProductItem extends Component {
    render() {
        const {data}=this.props
        return (
            <div className="discover__main__list" >
              <div className="discover__main__list__img">
                <img src={data.picture} alt="" />
                <span>{data.tap}</span>
              </div>

              <div className="discover__main__list__text">
                <h4 className="product__title">{data.product} </h4>
                <p>{data.discript}</p>
                <div className="text__product__massage">
                  <span className="text__price">
                    <i>￥</i>
                    <span className="text__price__t">{data.price}</span>
                  </span>
                  <span className="text__discount">{data.discount}</span>
                </div>
                <div className="text__shop__t">
                  <i></i> {data.shop}
                </div>
              </div>
            </div>
        );
    }
}

export default ProductItem;