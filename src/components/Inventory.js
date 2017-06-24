import React, {PropTypes} from 'react';
import base from '../base';

import AddFishForm from './AddFishForm';

class Inventory extends React.Component{
  constructor(){
    super();
    this.renderFish=this.renderFish.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.renderLogin=this.renderLogin.bind(this);
    this.authenticate=this.authenticate.bind(this);
    this.authHandler=this.authHandler.bind(this);
    this.logout=this.logout.bind(this);

    this.state ={
      uid:null,
      owner:null
    }
  }

  componentDidMount(){
    base.onAuth((user)=>{
      if(user){
        this.authHandler(null, {user});
      }
    })
  }

  handleChange(e,key){
    const fish=this.props.fishes[key];

    const updatedFish={
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.onFishUpdate(key, updatedFish)
  }

  authenticate(provider){
    console.log(`Trying to login with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout(){
    base.unauth();
    this.setState({
      uid:null
    })
  }

  authHandler(err, authData){
    if(err){
      console.error(err);
      return;
    }

    const storeRef = base.database().ref(this.props.storeId);
    storeRef.once('value', (snapshot)=>{
      const data = snapshot.val() || {};

      if(!data.owner){
        storeRef.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })

  }

  renderLogin(){
    return(
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={()=>this.authenticate('github')}>Login with Github</button>
        <button className="facebook" onClick={()=>this.authenticate('facebook')}>Login with Facebook</button>
        <button className="twitter" onClick={()=>this.authenticate('twitter')}>Login with Twitter</button>
      </nav>
    )
  }
  renderFish(key){
    const fish=this.props.fishes[key];

    return(
      <div className="fish-edit" key={key}>
        <input onChange={(e)=> this.handleChange(e)} name="name" value={fish.name} type="text" placeholder="Fish Name" />
        <input onChange={(e)=> this.handleChange(e)} name="price" value={fish.price} type="text" placeholder="Fish Price" />
        <select onChange={(e)=> this.handleChange(e)} name="status" value={fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea onChange={(e)=> this.handleChange(e)} name="desc" value={fish.desc} placeholder="Fish Desc"/>
        <input onChange={(e)=> this.handleChange(e)} name="image" value={fish.image} type="text" placeholder="Fish Image" />
        <button onClick={()=> this.props.onRemoveFish(key)}>-Remove Item</button>
      </div>
    )
  }
  render(){
    const logout = <button onClick={this.logout}>Log Out!</button>
    if(!this.state.uid){
      return(
        <div>{this.renderLogin()}</div>
      )
    }

    if(this.state.uid !== this.state.owner){
      return(
        <div>
          <p>
            Sorry you are not the owner of this store!<br/>
            {logout}
          </p>
        </div>
      )
    }
    return(
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes)
                    .map(this.renderFish)}
        <AddFishForm addNewFish={this.props.onAddFish}/>
        <button onClick={this.props.onLoadSamples}>Load Sample Fishes</button>
      </div>
    )
  }

  static propTypes = {
    fishes: PropTypes.object.isRequired,
    onAddFish: PropTypes.func.isRequired,
    onLoadSamples: PropTypes.func.isRequired,
    onRemoveFish: PropTypes.func.isRequired,
    onFishUpdate: PropTypes.func.isRequired,
    storeId:PropTypes.string.isRequired
  };
}



export default Inventory;
