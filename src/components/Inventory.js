import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component{
  constructor(){
    super();
    this.renderFish = this.renderFish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e,key){
    const fish = this.props.fishes[key];

    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.onFishUpdate(key, updatedFish)
  }

  renderFish(key){
    const fish = this.props.fishes[key];

    return(
      <div className="fish-edit" key={key}>
        <input onChange={(e)=> this.handleChange(e,key)} name="name" value={fish.name} type="text" placeholder="Fish Name" />
        <input onChange={(e)=> this.handleChange(e,key)} name="price" value={fish.price} type="text" placeholder="Fish Price" />
        <select onChange={(e)=> this.handleChange(e,key)} name="status" value={fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea onChange={(e)=> this.handleChange(e,key)} name="description" value={fish.desc} placeholder="Fish Desc"></textarea>
        <input onChange={(e)=> this.handleChange(e,key)} name="image" value={fish.image} type="text" placeholder="Fish Image" />
        <button onClick={()=> this.props.onRemoveFish(key)}>-Remove Item</button>
      </div>
    )
  }
  render(){
    return(
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes)
                    .map(this.renderFish)}
        <AddFishForm addNewFish = {this.props.onAddFish}/>
        <button onClick={this.props.onLoadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
