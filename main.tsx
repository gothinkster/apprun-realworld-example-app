import app from 'apprun';
const model = 'Hello world - AppRun';
const view = (state) => <h1>{state}</h1>;
const update = {
}
const element = document.getElementById('my-app');
app.start(element, model, view, update);
