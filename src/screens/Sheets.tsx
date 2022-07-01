/* eslint-disable react-hooks/exhaustive-deps */
import { Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import Table from "../components/Table";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getSheetsAsync, selectSheets } from "../store/slices/documentsSlice";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'name',
    headerName: 'File Name',
    flex: 1
  },
  {
    field: 'columns',
    headerName: 'Total columns',
    flex: 1,
    renderCell: (params) => (
      <Typography>
        {params?.row?.columns ? params?.row?.columns?.length : 0}
      </Typography>
    )
  },
  {
    field: 'records',
    headerName: 'Total records',
    flex: 1,
    renderCell: (params) => (
      <Typography>
        {params?.row?.records ? params?.row?.records?.length : 0}
      </Typography>
    )
  },
];

function Sheets() {
  const data = useAppSelector(selectSheets)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetchAsyncData() {
      try {
        await dispatch(getSheetsAsync())
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

export default Sheets;
