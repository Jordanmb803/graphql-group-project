import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { throwServerError } from 'apollo-link-http-common';

class RemoveCharacter extends Component {
    render(){
        return (
            <div>
                <button onClick={()=> this._removeCharacter()}>Delete</button>
            </div>
        )
    }
    _removeCharacter = async () => {
        const { id } = this.props
        await this.props.removeCharacter({
            variables: {
                index: id,
            }
        })
    }

}

const REMOVE_MUTATION = gql`
    mutation removeMutation($index: Int!) {
        removeCharacter(index: $index)
    }
`

export default graphql(REMOVE_MUTATION, { name: 'removeCharacter' })(RemoveCharacter)