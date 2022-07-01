/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from '@mui/material/styles';
import { useAppDispatch } from "../store/hooks";
import {
  addImagesAsync,
  addSheetsAsync,
  getImagesAsync,
  getSheetsAsync,
  setImagesAsync, 
  setSheetsAsync
} from "../store/slices/documentsSlice";
import { Button } from "@mui/material";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import to from 'await-to-js';
import { getBase64, handleParse } from "../services/getBase64";

const Input = styled('input')({
  display: 'none',
});

function Home() {
  const dispatch = useAppDispatch()

  const onChangeFiles = async (event: any) => {
    if (event.target.files.length > 0) {
      const filesPng = [];
      const filesCsv = [];
      for await (const file of event.target.files) {
        if (file.size < 5437209) {
          if (file.type === 'image/png') {
            filesPng.push({
              id: Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1),
              name: file.name,
              base64: await getBase64(file),
              size: file.size
            });
          } else {
            const result: any = await handleParse(file)
            filesCsv.push({
              ...result,
              id: Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1),
              name: file.name,
              base64:  await getBase64(file),
              size: file.size,
            });
          }
        } else {
          alert('File is very big')
        }
      }
      uploadImages(filesPng)
      uploadSheets(filesCsv)
    }
  };

  const uploadImages = async (files: any) => {
    const [err, data]: any = await to(dispatch(getImagesAsync()));
    try {
      if (err) {
        await dispatch(setImagesAsync(files))
      } else {
        const newData = [...data || [], ...files];
        await dispatch(addImagesAsync(newData))
      }
      await dispatch(getImagesAsync())
    } catch (error) {
      console.log(error);
    }
  }

  const uploadSheets = async (files: any) => {
    const [err, data]: any = await to(dispatch(getSheetsAsync()));
    try {
      if (err) {
        await dispatch(setSheetsAsync(files))
      } else {
        const newData = [...data || [], ...files];
        await dispatch(addSheetsAsync(newData))
      }
      await dispatch(getSheetsAsync())
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ paddingTop: 80 }}>
      <label htmlFor="contained-button-file">
        <Input
          type="file"
          accept="image/png, text/csv"
          multiple
          id="contained-button-file"
          onChange={onChangeFiles}
        />
        <Button
          size="large"
          color="secondary"
          component="span"
          startIcon={<DriveFileMoveIcon fontSize="large" />}
        >
          Add file
        </Button>
      </label>
      {/* <Table rows={dataFiles} /> */}
    </div>
  );
}

export default Home;
