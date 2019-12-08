import React from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import Header from './Header';
import RootCard from './Styles/RootCard';
import FollowerSection from './Styles/FollowerSection';

class RootUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rootUser: {},
            followers: [],
            searchError: {}
        };
    }

    retrieveAPIData(url, pseudoState){
        pseudoState = pseudoState || {rootUser: false, followers: false, searchError: {}};
        // Base case: rootUser and followers set
        if(pseudoState.rootUser && pseudoState.followers){
            return this.setState(pseudoState);
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
                <Header searchBar={this.props.searchBar} searchError={this.state.searchError} rootUser={this.props.rootUser}/>
                <RootCard><UserCard key={this.state.rootUser.id || 'top'} user={this.state.rootUser} /></RootCard>
                <h2>Followers</h2>
                <FollowerSection>
                {this.state.followers && this.state.followers.map(follower => <UserCard singleSearch={this.props.singleSearch} key={follower.id} user={follower} callRequired={true}/>)}
                </FollowerSection>
            </div>
        );
    }


}

export default RootUser;