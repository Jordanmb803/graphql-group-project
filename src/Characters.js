import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RemoveCharacter from './RemoveCharacter';
import UpdateCharacter from './UpdateCharacter';

class Characters extends Component {
    
    
    render() {

        if (this.props.charactersQuery.loading) {
            return <div>Loading</div>
        }


        const data = this.props.charactersQuery.characters

        console.log(this.props)
        return (
            <div className = "characterContainer">
                
                    <div>
                    {data.map(character => (
                        <div key={character.id} className = "characterCard">
                            <h2>{character.name}</h2>
                            <img src={character.picture} alt = "Character"/>
                            <RemoveCharacter id={character.id}/>
                            <UpdateCharacter id={character.id} />
                        </div>
                    ))}
                    </div>

                    
                
            </div>
        )
    }
}

const CHARACTERS_QUERY = gql`
    query charactersQuery {
        characters {
            id
            name
            picture
        }
    }
`

export default graphql(CHARACTERS_QUERY, { name: 'charactersQuery' })(Characters)