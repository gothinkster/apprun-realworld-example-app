import app from 'apprun'

export default function ({ errors }) {
  return <ul className="error-messages">
    {Object.keys(errors).map(key => <li>{`${key} ${errors[key]}`}</li>)}
  </ul>
}
