import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Button } from 'primereact/button';
import './CustomFileUpload.css';

const CustomFileUpload = forwardRef(({
    multiple = true,
    accept = "image/*",
    onSelect,
    onClear,
    headerTemplate,
    emptyTemplate,
    chooseOptions = {},
    style = {},
    maxFiles = 8
}, ref) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [totalSize, setTotalSize] = useState(0);

    useImperativeHandle(ref, () => ({
        getFiles: () => selectedFiles,
        clear: handleClear,
        removeFile: (index) => {
            if (index >= 0 && index < selectedFiles.length) {
                const fileToRemove = selectedFiles[index];
                handleRemoveFile(fileToRemove, index);
            }
        },
        formatSize: (bytes) => {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    }));

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);

        if (files.length + selectedFiles.length > maxFiles) {
            alert(`Máximo de ${maxFiles} imagens permitidas`);
            return;
        }

        const filesWithPreview = files.map(file => {
            file.objectURL = URL.createObjectURL(file);
            return file;
        });

        const newSelectedFiles = [...selectedFiles, ...filesWithPreview];
        const newTotalSize = newSelectedFiles.reduce((acc, file) => acc + file.size, 0);

        setSelectedFiles(newSelectedFiles);
        setTotalSize(newTotalSize);

        if (onSelect) {
            onSelect({ files: newSelectedFiles });
        }

        event.target.value = '';
    };
    const handleClear = () => {
        selectedFiles.forEach(file => {
            if (file.objectURL) {
                URL.revokeObjectURL(file.objectURL);
            }
        });

        setSelectedFiles([]);
        setTotalSize(0);

        if (onClear) {
            onClear();
        }
    };

    const handleChooseClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInputRef.current?.click();
    };
    const handleRemoveFile = (fileToRemove, index) => {
        const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
        const newTotalSize = newSelectedFiles.reduce((acc, file) => acc + file.size, 0);

        // Revogar URL do objeto para liberar memória
        if (fileToRemove.objectURL) {
            URL.revokeObjectURL(fileToRemove.objectURL);
        }

        setSelectedFiles(newSelectedFiles);
        setTotalSize(newTotalSize);


    };

    const defaultChooseOptions = {
        icon: 'pi pi-fw pi-images',
        label: 'Escolher Imagens',
        className: 'p-button-outlined',
        style: {
            borderColor: '#6b7280',
            color: '#6b7280',
            marginTop: '1rem'
        }
    };

    const mergedChooseOptions = { ...defaultChooseOptions, ...chooseOptions };

    return (
        <div className="custom-file-upload" style={style}>
            {/* Input file oculto */}
            <input
                ref={fileInputRef}
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
            {headerTemplate && headerTemplate({
                className: 'file-upload-header',
                totalSize,
                selectedFiles
            })}

            <div
                className="file-upload-content"
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const files = Array.from(e.dataTransfer.files);
                    const imageFiles = files.filter(file => file.type.startsWith('image/'));

                    if (imageFiles.length > 0) {
                        // Simular um evento de input file
                        const mockEvent = {
                            target: {
                                files: imageFiles
                            }
                        };
                        handleFileSelect(mockEvent);
                    }
                }}
            >
                {emptyTemplate()}
            </div>
        </div>
    );
});

CustomFileUpload.displayName = 'CustomFileUpload';

export default CustomFileUpload;