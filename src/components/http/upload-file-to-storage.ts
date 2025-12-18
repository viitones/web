import axios from "axios";

interface UploadFileToStorageParams {
  file: File;
  onProgress: (sizeInBytes: number) => void;
}

interface UploadFileToStorageOptions {
  signal?: AbortSignal;
}

export async function UploadFileToStorage(
  {file, onProgress}: UploadFileToStorageParams, 
  opts?: UploadFileToStorageOptions
) {
  const data = new FormData();
  data.append('file', file);

  const response = await axios.post<{ url: string }>('http://localhost:3333/uploads', data, {
    headers: {
      'Content-Type': 'multipart/form-data', //arquivos não podem ser enviados como json, apenas como form data
    },
    signal: opts?.signal,
    onUploadProgress(progressEvent) {
      onProgress(progressEvent.loaded)
    }
  })

  return { url: response.data.url};
}


//uso do axios porque ele usa o xmlhttprequest por baixo dos panos e suporta o upload com *progresso*
