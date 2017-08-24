import { ENDPOINT } from '../strings';

const fetchHeaders = new Headers();
fetchHeaders.append('Content-Type', 'application/json');
const fetchInit = {
  method: 'POST',
  headers: fetchHeaders,
  mode: 'cors',
  body: JSON.stringify({ query: 'query { folders { id name } }' }),
};
const fetchRequest = new Request(ENDPOINT, fetchInit);
// eslint-disable-next-line
export const fetchFolders = () => window.fetch(fetchRequest)
  .then(response => response.json())
  .then(({ data: { folders } }) => folders);
// NEED TO IMPLEMENT ADDFOLDER
// NEED TO IMPLEMENT REMOVEFOLDER
// NEED TO IMPLEMENT UPDATEFOLDER
