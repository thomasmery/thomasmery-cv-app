import React from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

export default props => (
  <Query
    query={gql`
      {
        pages {
          title
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      return loading ? (
        <p>Loading ... </p>
      ) : (
        <p className="App-intro">{data.pages[0].title}</p>
      );
    }}
  </Query>
);
