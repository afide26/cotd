import React from 'react';
import {getFunName} from '../helpers'



class StorePicker extends React.Component {
  constructor(){
    super();
    this.selectStore = this.selectStore.bind(this);
  }
  selectStore(event){
    event.preventDefault();

    console.log(this.storeInput.value.toUpperCase());
  }
  render(){
    return(
      <form className="store-selector" onSubmit={this.selectStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref={(input)=> this.storeInput = input} required placeholder="Store Name" defaultValue={ getFunName() } />
        <button type="submit">Visit Store > </button>
      </form>
    )
  }
}

export default StorePicker;
