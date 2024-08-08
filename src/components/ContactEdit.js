import React, { useState, useEffect } from 'react';

const ContactEdit = ({ initialContent, onSave }) => {
    const [content, setContent] = useState(initialContent);

    const handleSave = () => {
        onSave(content);
    };

    return (
        <div>
            <h2>Contact Edit</h2>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="10"
                cols="50"
            />
            <br />
            <button onClick={handleSave}>Kaydet</button>
        </div>
    );
};

export default ContactEdit;
