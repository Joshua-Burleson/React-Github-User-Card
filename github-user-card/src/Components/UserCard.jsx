import React from 'react';
import axios from 'axios';
import UserAnchor from './Styles/UserAnchor';

class UserCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    componentDidMount(){
        // If not Root user, make API call to collect verbose data (primarily in this case to display the NAME when present instead of just LOGIN)
        if(this.props.callRequired){
            axios.get(this.state.user.url)
                 .then(res => this.setState({
                     user: res.data
                 }))
                 .catch(err => console.log('API CALL ERROR:', err))
        }
    }

    render(){
        return(
            <UserAnchor href={this.state.user.html_url}>
                <img src={this.state.user.avatar_url} />
                <h3>{this.state.user.name || this.state.user.login}</h3>
                <p>{this.state.user.location}</p>
                {this.state.user.hireable && <p>Open to employment offers!</p>}
                <span>{`Github: ${this.state.user.name ? this.state.user.login : this.state.user.html_url}`}</span>
            </UserAnchor>
        );
    }
}

export default UserCard;