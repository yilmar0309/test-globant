import { DataGrid } from '@mui/x-data-grid';


interface Props {
  rows: any;
  columns: any;
}

export default function Table({ rows, columns }: Props) {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        disableSelectionOnClick
      />
    </div>
  );
}
