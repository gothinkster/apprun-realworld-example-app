import app from 'apprun'

export default function ({ messages }) {
  return <ul className="error-messages">
    {messages.map(message => <li>{message}</li>)}
  </ul>
}
