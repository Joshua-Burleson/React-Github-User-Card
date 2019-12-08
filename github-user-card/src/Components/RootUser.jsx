import React from 'react';
import axios from 'axios';
import UserCard from './UserCard';

class RootUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rootUser: {},
            followers: []
        };
    }

    retrieveAPIData(url, pseudoState){
        pseudoState = pseudoState || {rootUser: false, followers: false};
        if(pseudoState.rootUser && pseudoState.followers){
            console.log('Base Case!', pseudoState)
            this.setState(pseudoState);
            return;
        }
        axios.get(url)
            .then(res => {
                console.log(res.data)
                pseudoState[!pseudoState.rootUser ? 'rootUser' : 'followers'] = res.data;
                return this.retrieveAPIData(url.split('/').includes('followers') ? url : `${url}/followers`, pseudoState);
            })
            .catch(err => this.setState({...this.state, searchError: {error: err, message: `User ${this.props.rootUser} not found`}}));
    };


    componentDidMount(){
        this.retrieveAPIData(`https://api.github.com/users/${this.props.rootUser}`);
    };

    componentDidUpdate(prevProps){
        if(prevProps.rootUser !== this.props.rootUser){
            this.retrieveAPIData(`https://api.github.com/users/${this.props.rootUser}`);
        }
    }

    render(){
        return(
            <div>
                <h1>{this.state.searchError && this.state.searchError.message || this.props.rootUser}</h1>
                <UserCard key={this.state.rootUser.id || 'top'} user={this.state.rootUser} />
                {this.props.searchBar}
                <h2>Followers</h2>
                {this.state.followers && this.state.followers.map(follower => <UserCard singleSearch={this.props.singleSearch} key={follower.id} user={follower} callRequired={true}/>)}
            </div>
        );
    }


}

export default RootUser;