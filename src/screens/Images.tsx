/* eslint-disable react-hooks/exhaustive-deps */
import { GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import Table from "../components/Table";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getImagesAsync, selectImages } from "../store/slices/documentsSlice";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'name',
    headerName: 'File Name',
    flex: 1
  },
  {
    field: 'base64',
    headerName: 'Img',
    width: 100,
    renderCell: (params) => (
      <img src={params?.row?.base64} alt='logo' width={50} height={50} />
    )
  },
];

function Images() {
  const data = useAppSelector(selectImages)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetchAsyncData() {
      try {
        await dispatch(getImagesAsync())
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchAsyncData()
  }, [])

  return (
    <div>
        <Table rows={data} columns={columns} />
    </div>
  );
}

export default Images;
