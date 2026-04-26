import { create } from 'zustand';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadState {
  file: any | null; 
  progress: number; 
  status: UploadStatus; 
  errorMessage: string | null; 
  
  // Actions
  setFile: (file: any) => void;
  setProgress: (progress: number) => void;
  setStatus: (status: UploadStatus) => void;
  setError: (message: string | null) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  progress: 0,
  status: 'idle',
  errorMessage: null,

  setFile: (file) => set({ file }),
  setProgress: (progress) => set({ progress }),
  setStatus: (status) => set({ status }),
  setError: (errorMessage) => set({ errorMessage, status: 'error' }),
  reset: () => set({ file: null, progress: 0, status: 'idle', errorMessage: null }),
}));