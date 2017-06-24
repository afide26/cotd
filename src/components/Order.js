import React, { PropTypes } from 'react';
import { formatPrice } from '../helpers.js';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component{
  constructor(){
    super();
    this.renderOrder=this.renderOrder.bind(this);
  }
  renderOrder(key){
    const fish=this.props.fishes[key];
    const count=this.props.order[key];
    const removeButton=<button onClick={()=> this.props.onRemoveOrder(key)}>&#42;</button>

    if(!fish || fish.status==='unavailable'){
      return <li key={key}> Sorry, {fish ? fish.name : 'fish'} is no longer available {removeButton}</li>
    }else if(!count){
      return null;
    }

    return(
      <li key={key}>
        <span>
          <CSSTransitionGroup
            transitionName="count"
            className="count"
            component="span"
            transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
            >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>

          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{formatPrice(fish.price * count) }</span>
      </li>
    )
  }

  render(){
    const orderIds=Object.keys(this.props.order);
    const total=orderIds.reduce((prevTotal, key)=>{
      const fish=this.props.fishes[key];
      const count=this.props.order[key];
      const isAvailable=fish && fish.status === 'available';

      if(isAvailable){
        return prevTotal + (count * fish.price || 0);
      }
    },0)
    return(
      <div className="order-wrap">
        <h2>Your Orders</h2>
          <CSSTransitionGroup
            component="ul"
            transitionName="order"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            className="order">
            {orderIds.map((this.renderOrder))}
            <li className="total">
              <strong>Total:</strong>
              {formatPrice(total)}
            </li>
          </CSSTransitionGroup>
      </div>
    )
  }
}

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  onRemoveOrder: PropTypes.func.isRequired,
}
export default Order;
