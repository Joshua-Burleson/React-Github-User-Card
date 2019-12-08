import React from 'react';
import HeadBar from './Styles/HeadBar';
import ghBadge from '../Assets/ghbadge.png'

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <HeadBar>
                <img src={ghBadge} />
                <h4>{this.props.searchError && this.props.searchError.message || `Current User: ${this.props.rootUser.toUpperCase()}`}</h4>
                
                {this.props.searchBar}
            </HeadBar>
        );
    }
}

export default Header;