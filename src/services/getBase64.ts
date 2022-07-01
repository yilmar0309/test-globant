import Papa from "papaparse";

export const getBase64 = (file: any) => {
  return new Promise(resolve => {
    let baseURL: any = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const handleParse = (file: File) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = async ({ target }: any) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData: any = csv?.data;
      const columns = Object.keys(parsedData[0]);
      resolve({ columns: columns || [], records: parsedData || [] })
    };
    reader.readAsText(file);
  });
};