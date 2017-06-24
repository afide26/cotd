import React, {PropTypes} from 'react';
import { formatPrice } from '../helpers.js';

class Fish extends React.Component{
  render(){
    const {details, index} = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
    return(
      <li className="menu-fish">
        <img src={details.image} alt={details.name}/>
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}/lb</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={()=> this.props.onAddToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }
}

Fish.propTypes = {
  onAddToOrder: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired
}
export default Fish;
