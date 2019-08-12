import React, { Component } from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class App extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="container">
                {this.props.data.loading === true ? "Loading" : this.props.data.search.edges.map(data =>
                    <ul key={data.node.id}>
                        <li style={{ fontWeight: 'bold' }}>
                            Repository: <a href={data.node.url}>{data.node.name}</a>
                        </li>
                        <li><strong>Description:</strong>   {data.node.description}
                        </li>
                        <li><strong>CreatedAt: </strong>{data.node.createdAt}</li>
                        <li><strong>PushedAt: </strong>{data.node.pushedAt}</li>
                        <li><strong>Type:</strong> {data.node.isPrivate === true ? "Private" : "Public"}</li>
                    </ul>
                )}
            </div>
        );
    }
}

const repoQuery = gql`
    query($name: String!){
        search(query: $name, last: 50, type: REPOSITORY) {
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        description
                        url
                        pushedAt
                        createdAt
                        isPrivate
                    }
                }
            }
        }
    }
`

const AppWithData = graphql(
    repoQuery,
    {
        options: {
            variables: {
                name: "react-graphql"
            }
        }
    }
)(App)

export default AppWithData;