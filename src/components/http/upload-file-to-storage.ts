import axios from "axios";

interface UploadFileToStorageParams {
  file: File;
}

export async function UploadFileToStorage({file}: UploadFileToStorageParams) {
  const data = new FormData();
  data.append('file', file);

  const response = await axios.post<{ url: string }>('http://localhost:3333/uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data', //arquivos não podem ser enviados como json, apenas como form data
    }
  })

  response.data.url;
}


//uso do axios porque ele usa o xmlhttprequest por baixo dos panos e suporta o upload com *progresso*
