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
            .catch(err => console.log(err));
    };


    componentDidMount(){
        this.retrieveAPIData('https://api.github.com/users/Joshua-Burleson');
    };

    render(){
        return(
            <div>
                <UserCard key={this.state.rootUser.id || 'top'} user={this.state.rootUser} />
                {this.state.followers && this.state.followers.map(follower => <UserCard key={follower.id} user={follower} callRequired={true}/>)}
            </div>
        );
    }


}

export default RootUser;