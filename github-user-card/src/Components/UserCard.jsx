import React from 'react';
import axios from 'axios';

class UserCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user: this.props.user
        }
    }

    componentDidMount(){
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
            <div>
                <img src={this.state.user.avatar_url} />
                <h3>{this.state.user.name || this.state.user.login}</h3>
                <a href={this.state.user.url}>{this.state.user.url}</a>
            </div>
        );
    }
}

export default UserCard;