'use client'

import * as React from 'react';
import {Upload} from 'lucide-react'

const FileUploadComponent: React.FC = () => {

    const handleFileUploadButtonClick = () => {
        const elem = document.createElement('input');
        elem.setAttribute('type', 'file');
        elem.setAttribute('accept', 'application/pdf');
        elem.addEventListener('change', async (ev) => {
            if (elem.files && elem.files.length > 0) {
                const file = elem.files.item(0)
                const formData = new FormData()
                if (file) {
                    formData.append('pdf', file);
                    await fetch('http://localhost:8000/upload/pdf', {
                        method: 'POST',
                        body: formData
                    });
                    console.log('File uploaded');
                }
            }
        });
        elem.click();
    };

    return (
        <div className="bg-slate-900 text-white shadow-2xl flex items-center justify-center p-4 rounded-lg border-white border-2">
            <div onClick={handleFileUploadButtonClick} className= "flex items-center justify-center flex-col">
                <h3>Upload PDF File</h3>
                <Upload />
            </div>
        </div>
    )
};

export default FileUploadComponent;
