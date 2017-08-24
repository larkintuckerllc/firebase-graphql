import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { ENDPOINT } from '../strings';

const networkInterface = createNetworkInterface({
  uri: ENDPOINT,
});
export default new ApolloClient({
  networkInterface,
});
