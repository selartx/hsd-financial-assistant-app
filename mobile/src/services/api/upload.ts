import axios from 'axios';

interface UploadResponse {
  id: string;
  status: string;
}

export const uploadDocument = async (
  uri: string, 
  onProgress: (percent: number) => void
): Promise<UploadResponse> => {
  const formData = new FormData();
  
  const fileName = uri.split('/').pop() || 'document.file';

  const extension = fileName.split('.').pop()?.toLowerCase();

  let mimeType = 'application/octet-stream'; 
  
  if (extension === 'pdf') {
    mimeType = 'application/pdf';
  } else if (['jpg', 'jpeg', 'png', 'heic', 'webp'].includes(extension || '')) {
    // React Native 'jpg' uzantısını bazen tanımaz
    mimeType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;
  } else if (extension === 'doc' || extension === 'docx') {
    mimeType = 'application/msword';
  }

  // React Native formatına uygun obje
  const fileToUpload = {
    uri: uri,
    name: fileName,
    type: mimeType, 
  };

  formData.append('file', fileToUpload as any);

  // Backend İsteği
  const response = await axios.post<UploadResponse>(
    'endpoint-url', //enter your endpoint url here
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
        onProgress(percent);
      },
    }
  );

  return response.data;
};