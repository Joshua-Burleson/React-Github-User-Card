import React from 'react';
import { thisExpression } from '@babel/types';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            search: ''
        };
    };

    render(){
        return(
            <form onSubmit={ (e) => {
                                        e.preventDefault();
                                        this.props.setRoot(this.state.search);
                                        this.setState({...this.state, search: ''});
                                    }
            }>
                <input type='text' onChange={e => this.setState({search: e.target.value})} value={this.state.search} placeholder="Username Search"></input>
                <input type="submit" />
            </form>
            );
    }
}

export default SearchBar;