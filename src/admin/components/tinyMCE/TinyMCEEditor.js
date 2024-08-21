// TinyMCEEditor.js
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinyMCEEditor = () => (
    <Editor
        apiKey="1d2k0wy6u2uwaugqjkhht477ixjfw67swj8j0uoxo1lp6cke"
        init={{
            height: 500,
            menubar: false,
            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
            toolbar: `
                undo redo | formatselect | 
                bold italic underline strikethrough | 
                alignleft aligncenter alignright alignjustify | 
                bullist outdent indent | 
                forecolor backcolor | 
                visualblocks visualchars | 
                code fullscreen | 
                hr removeformat | 
                searchreplace
            `,
        }}
    />
);

export default TinyMCEEditor;
