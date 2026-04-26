/**
 * File Utilities
 * Dosya boyutu formatlama ve tip kontrolleri için yardımcı fonksiyonlar.
 */

/**
 * Byte cinsinden boyutu okunabilir formata çevirir (KB, MB vb.)
 */
export const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '0 KB';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Dosya isminden uzantıyı çeker
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.split('.').pop()?.toLowerCase() || '';
};

/**
 * Dosyanın bir görsel olup olmadığını kontrol eder
 */
export const isImage = (fileName: string): boolean => {
  const ext = getFileExtension(fileName);
  return ['jpg', 'jpeg', 'png', 'webp', 'heic'].includes(ext);
};

/**
 * Dosyanın desteklenen bir doküman (PDF, DOC) olup olmadığını kontrol eder
 */
export const isPDF = (fileName: string): boolean => {
  return getFileExtension(fileName) === 'pdf';
};