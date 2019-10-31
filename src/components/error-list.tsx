import app from 'apprun';

export default function({ errors }) {
  return (
    <ul class="error-messages">
      {Object.keys(errors).map(key => (
        <li>{`${key} ${errors[key]}`}</li>
      ))}
    </ul>
  );
}
