import React from 'react' 

function ErrorMessage({ error }) {
    return <p>{error.message}</p>
}

export default ErrorMessage