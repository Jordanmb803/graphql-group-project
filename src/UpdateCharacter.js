import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { throwServerError } from 'apollo-link-http-common';

class UpdateCharacter extends Component {
    state = {
        editable: false
    }

    render(){
        return (
            <div>
                <button onClick={() => this.setState({editable: !this.state.editable})}>Edit</button>
                <input 
                    className={this.state.editable ? 'pictureUrl' : 'invisable'}
                    value={this.state.picture}
                    onChange={e => this.setState({picture: e.target.value})}
                    placeholder='new pic url'
                />
                <button className={this.state.editable === false ? 'invisable' : 'button'} onClick={()=> this._updateCharacter()}>Update</button>
            </div>
        )

    }

    _updateCharacter = async () => {
        const {id} = this.props
        const {picture} = this.state

        await this.props.updateCharacter ({
            variables: {
                picture,
                index: id
            }
        })
    }
}

const UPDATE_MUTATION = gql`
    mutation updateMutation($index: Int!, $picture: String!) {
        updateCharacter(index: $index, picture: $picture){
            id
            name
            picture
        }
    }
`

export default graphql(UPDATE_MUTATION, { name: 'updateCharacter' })(UpdateCharacter)