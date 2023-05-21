import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BaselineDocument = () => {
  const [document, setDocument] = useState('');

  useEffect(() => {
    // Fetch the omxpbaseline document from the server
    // axios.get('/api/omxpbaseline')
    axios.get('https://bishumoharana-automatic-eureka-gx7p9967xjhp4xw-5000.preview.app.github.dev/api/omxpbaseline')
      .then((response) => {
        // Get the first document from the response
        const [firstDocument] = response.data;
        setDocument(JSON.stringify(firstDocument, null, 2));
      })
      .catch((error) => {
        console.error('Error fetching omxpbaseline document:', error);
      });
  }, []);

  return (
    <div>
      <h1>omxpbaseline Document</h1>
      <textarea
        value={document}
        rows={10}
        cols={50}
        readOnly
      />
    </div>
  );
};

export default BaselineDocument;
