import PouchDB from 'pouchdb-browser';

const db = new PouchDB('documents');


export interface CustomFileDB {
  id: string;
  name: string;
  base64: string;
  size: number;
}

export const getSheetsServices = async () => {
  try {
    const doc = await db.get('sheets');
    return doc
  } catch (err: any) {
    console.log('Error ->', err.name);
    throw new Error('Error')
  }
}

export const getImagesService = async () => {
  try {
    const doc = await db.get('images');
    return doc
  } catch (err: any) {
    console.log('Error ->', err.name);
    throw new Error('Error')
  }
}

export const setSheetsService = async (docs: any) => {
  try {
    const result = await db.put({ _id: 'sheets', docs });
    return result;
  } catch (err) {
    console.log(err);
  }
}

export const setImagesService = async (docs: any) => {
  try {
    const result = await db.put({ _id: 'images', docs });
    return result;
  } catch (err) {
    console.log(err);
  }
}

export const addSheetsService = async (docs: any) => {
  try {
    const doc = await db.get('sheets');
    const response = await db.put({
      _id: 'sheets',
      _rev: doc._rev,
      docs
    });
    return response
  } catch (err) {
    console.log(err);
  }
}

export const addImagesService = async (docs: any) => {
  try {
    const doc = await db.get('images');
    const response = await db.put({
      _id: 'images',
      _rev: doc._rev,
      docs
    });
    return response
  } catch (err) {
    console.log(err);
  }
}
