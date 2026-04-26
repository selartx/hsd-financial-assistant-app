import { useUploadStore } from '../state/upload/upload.store';
import { uploadDocument } from '../services/api/upload';

export const useUpload = () => {
  const { setStatus, setProgress, setError, reset } = useUploadStore();
  const status = useUploadStore((state) => state.status);

  const startUpload = async (uri: string) => {
    try {
      setStatus('uploading'); 
      setProgress(0);

      const result = await uploadDocument(uri, (percent) => {
        setProgress(percent); // Yüzde ilerleme güncellenir 
      });

      if (result.status === 'uploaded') {
        setStatus('success'); 
      }
    } catch (err: any) {
      setError(err.message || 'Yükleme başarısız oldu'); 
      console.error('Upload Error:', err);
    }
  };

  return { startUpload, status, reset };
};