import React from 'react';
import { Redirect } from 'react-router-dom';

import { Query } from 'react-apollo';

import { getRepo } from './queries';

import './RepoPage.css';

const RepoPage = ({ match }) =>  {
  const { params: { login, repo } } = match;

  return(
    <section className='repo-page'>
    <h1 className='repo-name-header'>{ repo }</h1>
      <Query
        query={ getRepo }
        variables={{ owner: login, repo }}
      >
        { ({ error, loading, data }) => {
          if(loading) {
            return (
              <p className='message'>loading...</p>
            );
          }

          if(error) {
            return (
              <p className='message'>error!</p>
            );
          }

          if(data.repository) {
            const { repository: { description, object } } = data;

            if(object) {
              const html = `${object.text.replace(/\n/g, '<br>')}`

              return(
                <div className='git-info' dangerouslySetInnerHTML={{ __html: html }}></div>
              );
            }
  
            return(
              <div className='git-info'>{ description }</div>
            );
          }

          return (
            <Redirect to='/'/>
          );
        } }
      </Query>
    </section>
  );
};

export default RepoPage;
