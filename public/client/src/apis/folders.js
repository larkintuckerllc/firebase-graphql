import { foldersRef } from './firebase';

export const addFolder = folder => foldersRef.push(folder);
export const removeFolder = (folder) => {
  const folderRef = foldersRef.child(folder.id);
  return folderRef.remove();
};
export const updateFolder = (folder) => {
  const folderRef = foldersRef.child(folder.id);
  return folderRef.set(folder);
};
