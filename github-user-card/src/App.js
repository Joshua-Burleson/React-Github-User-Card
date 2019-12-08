import React from 'react';
import RootUser from './Components/RootUser';
import SearchBar from './Components/SearchBar';
import './App.css';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      rootUser: 'Joshua-Burleson'
    }
  }

  setRoot = (search) => {
    this.setState({
      rootUser: search
    });
  }
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <RootUser searchBar={<SearchBar setRoot={this.setRoot} />} rootUser={this.state.rootUser} fresh={true}/>
        </div>
      </div>
    );
  }
}

export default App;
