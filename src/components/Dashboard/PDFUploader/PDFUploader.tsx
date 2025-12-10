import { useCallback, useState } from 'react';
import classNames from 'classnames';

import styles from './PDFUploader.module.scss';

interface Props {
  onUpload: (file: File) => void;
}

export default function PDFUploader({ onUpload }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('PDF 파일만 업로드 가능합니다.');
      }
    },
    []
  );

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('PDF 파일만 업로드 가능합니다.');
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  }, [selectedFile, onUpload]);

  return (
    <div className={styles.uploader}>
      <div
        className={classNames(styles.uploader__dropzone, {
          [styles['uploader__dropzone--dragging']]: isDragging,
          [styles['uploader__dropzone--selected']]: selectedFile,
        })}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className={styles.uploader__input}
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload" className={styles.uploader__label}>
          {selectedFile ? (
            <>
              <span className={styles.uploader__icon}>📄</span>
              <span className={styles.uploader__filename}>{selectedFile.name}</span>
              <span className={styles.uploader__size}>
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </>
          ) : (
            <>
              <span className={styles.uploader__icon}>📤</span>
              <span className={styles.uploader__text}>
                PDF 파일을 드래그하거나 클릭하여 선택하세요
              </span>
              <span className={styles.uploader__hint}>
                최대 50MB까지 업로드 가능합니다
              </span>
            </>
          )}
        </label>
      </div>

      {selectedFile && (
        <div className={styles.uploader__actions}>
          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            className={styles.uploader__buttonSecondary}
          >
            파일 변경
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.uploader__buttonPrimary}
          >
            처리 시작
          </button>
        </div>
      )}
    </div>
  );
}

