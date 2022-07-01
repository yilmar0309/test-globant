import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { 
  addImagesService,
  addSheetsService,
  CustomFileDB, 
  getImagesService,
  getSheetsServices,
  setImagesService,
  setSheetsService, 
} from '../../services/db';
import { RootState } from '../store';

export interface DocumentsState {
  images: CustomFileDB[];
  sheets: CustomFileDB[];
}

const initialState: DocumentsState = {
  images: [],
  sheets: [],
};

export const getImagesAsync = () => async (dispatch: Dispatch) => {
  try {
    const files: any = await getImagesService()
    console.log('getImagesAsync', files)
    dispatch(setImages(files.docs))
    return files.docs
  } catch (error: any) {
    console.log('ERROR -> getImagesAsync', error)
    throw new Error(error)
  }
}

export const getSheetsAsync = () => async (dispatch: Dispatch) => {
  try {
    const files: any = await getSheetsServices()
    console.log('getSheetsAsync', files)
    dispatch(setSheets(files.docs))
    return files.docs
  } catch (error: any) {
    console.log('ERROR -> getSheetsAsync', error)
    throw new Error(error)
  }
}

export const setImagesAsync = (docs: any) => async () => {
  try {
    const files  = await setImagesService(docs)
    console.log('setImagesAsync', files)
  } catch (error: any) {
    console.log('ERROR -> setImagesAsync', error)
    throw new Error(error)
  }
}

export const setSheetsAsync = (docs: any) => async () => {
  try {
    const files  = await setSheetsService(docs)
    console.log('setSheetsAsync', files)
  } catch (error: any) {
    console.log('ERROR -> setSheetsAsync', error)
    throw new Error(error)
  }
}

export const addImagesAsync = (docs: any) => async () => {
  try {
    const files  = await addImagesService(docs)
    console.log('addImagesAsync', files)
  } catch (error: any) {
    console.log('ERROR -> addImagesAsync', error)
    throw new Error(error)
  }
}

export const addSheetsAsync = (docs: any) => async () => {
  try {
    const files  = await addSheetsService(docs)
    console.log('addSheetsAsync', files)
  } catch (error: any) {
    console.log('ERROR -> addSheetsAsync', error)
    throw new Error(error)
  }
}

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setSheets: (state, action) => {
      state.sheets = action.payload;
    },
  },
});

export const { setImages, setSheets } = documentsSlice.actions;

export const selectImages = (state: RootState) => state.documents.images;
export const selectSheets = (state: RootState) => state.documents.sheets;

export default documentsSlice.reducer;
