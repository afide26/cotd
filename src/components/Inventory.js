import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component{
  render(){
    return(
      <div>
        <h2>Inventory</h2>
        <AddFishForm addNewFish = {this.props.onAddFish}/>
        <button onClick={this.props.onLoadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
