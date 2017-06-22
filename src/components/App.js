import React from 'react';
import base from '../base';

import Header from './Header.js';
import Order from './Order.js';
import Inventory from './Inventory.js'
import sampleFishes from '../sample-fishes';
import Fish from './Fish';



class App extends React.Component{
  constructor(){
    super();
    this.handleAddFish = this.handleAddFish.bind(this);
    this.handleOnRemoveFish = this.handleOnRemoveFish.bind(this);
    this.handleLoadSamples = this.handleLoadSamples.bind(this);
    this.handleAddToOrder = this.handleAddToOrder.bind(this);
    this.handleUpdateFish = this.handleUpdateFish.bind(this);
    this.handleOnRemoveOrder = this.handleOnRemoveOrder.bind(this);
    this.state={
      fishes:{},
      order:{}
    }
  }

componentWillMount(){
  this.ref = base.syncState(`${this.props.params.storeId}`, {
    context: this,
    state:'fishes'
  });

  const localStorageRef = localStorage.getItem(`order-${this.props.params.orderId}`);

  if(localStorageRef){
    this.setState({
      order: JSON.parse(localStorageRef)
    })
  }
}

componentWillUnmount(){
  base.removeBinding(this.ref)
}

componentWillUpdate(nextProps,nextState){
  localStorage.setItem(`order-${this.props.params.orderId}`,
    JSON.stringify(nextState.order))
}

handleAddFish(fish){
  const fishes = {...this.state.fishes};

  const timestamp = Date.now();
  fishes[`fish-${timestamp}`] = fish;
  this.setState({fishes});
}

handleLoadSamples(){
  this.setState({
    fishes: sampleFishes
  })
}

handleAddToOrder(key){
  const order = {...this.state.order};
  // update or add the number of fish ordered
  order[key] = order[key] + 1 || 1;
  this.setState({order})
}

handleUpdateFish(key, updatedFish){
  const fishes = {...this.state.fishes}
  fishes[key] = updatedFish;
  this.setState({fishes});
}

handleOnRemoveFish(key){
  const fishes = {...this.state.fishes}
  fishes[key]=null;
  this.setState({fishes});
}

handleOnRemoveOrder(key){
  const order = {...this.state.order};
  delete order[key];
  this.setState({order});
}

  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {Object
              .keys(this.state.fishes)
              .map( (key) => <Fish key={key} index={key} onAddToOrder={this.handleAddToOrder} details={this.state.fishes[key]}/>)
            }
          </ul>
        </div>
        <Order
              params = {this.props.params}
              fishes={this.state.fishes}
              order={this.state.order}
              onRemoveOrder={this.handleOnRemoveOrder}
        />
        <Inventory
          onAddFish={this.handleAddFish}
          onLoadSamples={this.handleLoadSamples}
          fishes={this.state.fishes}
          onFishUpdate={this.handleUpdateFish}
          onRemoveFish={this.handleOnRemoveFish}/>
      </div>
    )
  }
}

export default App;
