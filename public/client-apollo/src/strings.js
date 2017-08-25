import { gql } from 'react-apollo';

export const ACTION_PREFIX = 'app/';
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCfU46SrON5RqWlI_b9SS5rs9gsUwjQyjI',
  authDomain: 'fir-graphql-d3127.firebaseapp.com',
  databaseURL: 'https://fir-graphql-d3127.firebaseio.com',
  projectId: 'fir-graphql-d3127',
  storageBucket: 'fir-graphql-d3127.appspot.com',
  messagingSenderId: '435897940971',
};
export const ENDPOINT = 'https://us-central1-fir-graphql-d3127.cloudfunctions.net/api/graphql';
export const FOLDERS_GQL = gql`
  query {
    folders {
      id name
    }
  }
`;
export const CREATE_FOLDER_GQL = gql`
  mutation createFolder($name: String!) {
    createFolder(input:{
      name: $name,
    }) {
      id
      name
    }
  }
`;
export const UPDATE_FOLDER_GQL = gql`
  mutation updateFolder($id: String!, $name: String!) {
    updateFolder(input:{
      id: $id,
      name: $name,
    }) {
      id
      name
    }
  }
`;
export const DELETE_FOLDER_GQL = gql`
  mutation deleteFolder($id: String!) {
    deleteFolder(input: {
      id: $id,
    }) {
      id
      name
    }
  }
`;
