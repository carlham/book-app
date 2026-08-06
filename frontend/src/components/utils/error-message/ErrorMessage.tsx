interface ErrorMessageProps {
    error: Error
}

function ErrorMessage({ error }: ErrorMessageProps) {
    return <p>{error.message}</p>
}

export default ErrorMessage
