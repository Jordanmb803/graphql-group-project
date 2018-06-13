import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { throwServerError } from 'apollo-link-http-common';

class AddCharacter extends Component {
    state = {
        name: '',
        picture: ''
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                    placeholder="Character Name"
                />
                <input
                    value={this.state.picture}
                    onChange={e => this.setState({ picture: e.target.value })}
                    placeholder='Character Picture Url'
                />
                <button onClick={() => this._addCharacter()}>Add AddCharacter</button>
            </div>
        )
    }

    _addCharacter = async () => {
        const { name, picture } = this.state
        await this.props.addCharacter({
            variables: {
                name,
                picture
            }
        })
    }
}

const ADD_MUTATION = gql`
    mutation addMutation($name: String!, $picture: String!) {
        addCharacter(name: $name, picture: $picture) {
            id
            name
            picture
        }
    }
`

export default graphql(ADD_MUTATION, { name: 'addCharacter' })(AddCharacter)
