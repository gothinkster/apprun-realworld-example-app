import home from '../src/components/home';
import signin from '../src/components/signin';
import register from '../src/components/register';
import editor from '../src/components/editor';
import settings from '../src/components/settings';
import profile from '../src/components/profile';
import article from '../src/components/article';
import header from '../src/components/header';

describe('HeaderComponent', ()=>{
  it ('should handle event: /set-user', ()=>{
    header.run('/set-user');
    expect(header.state).toBeTruthy();
  })
});

describe('HomeComponent', () => {
  it('should handle event: #/', () => {
    home.run('#/');
    expect(home.state).toBeTruthy();
  })
  it('should handle event: #/feed', () => {
    home.run('#/feed');
    expect(home.state).toBeTruthy();
  })
  it('should handle event: #/tag', () => {
    home.run('#/tag');
    expect(home.state).toBeTruthy();
  })
  it('should handle event: update-article', () => {
    home.run('update-article');
    expect(home.state).toBeTruthy();
  })
});

describe('SigninComponent', () => {
  it('should handle event: #/login', () => {
    signin.run('#/login');
    expect(signin.state).toBeTruthy();
  })
  it('should handle event: #/logout', () => {
    signin.run('#/logout');
    expect(signin.state).toBeTruthy();
  })
  it('should handle event: sign-in', () => {
    signin.run('sign-in');
    expect(signin.state).toBeTruthy();
  })
});

describe('RegisterComponent', () => {
  it('should handle event: #/register', () => {
    register.run('#/register');
    expect(register.state).toBeTruthy();
  })
  it('should handle event: register', () => {
    register.run('register');
    expect(register.state).toBeTruthy();
  })
});

describe('ProfileComponent', () => {
  it('should handle event: #/profile', () => {
    profile.run('#/profile');
    expect(profile.state).toBeTruthy();
  })
  it('should handle event: update-article', () => {
    profile.run('update-article');
    expect(profile.state).toBeTruthy();
  })
  it('should handle event: update-follow', () => {
    profile.run('update-follow');
    expect(profile.state).toBeTruthy();
  })
});

describe('SettingsComponent', () => {
  it('should handle event: #/settings', () => {
    settings.run('#/settings');
    expect(settings.state).toBeTruthy();
  })
  it('should handle event: submit-settings', () => {
    settings.run('submit-settings');
    expect(settings.state).toBeTruthy();
  })
  xit('should handle event: ok', () => {
    settings.run('ok');
    expect(settings.state).toBeTruthy();
  })
  xit('should handle event: cancel', () => {
    settings.run('cancel');
    expect(settings.state).toBeTruthy();
  })
});

describe('EditorComponent', () => {
  it('should handle event: #/editor', () => {
    editor.run('#/editor');
    expect(editor.state).toBeTruthy();
  })
  it('should handle event: submit-article', () => {
    editor.run('submit-article');
    expect(editor.state).toBeTruthy();
  })
});

describe('ArticleComponent', () => {
  it('should handle event: #/article', () => {
    article.run('#/article');
    expect(article.state).toBeTruthy();
  })
  it('should handle event: /new-comment', () => {
    article.run('/new-comment');
    expect(article.state).toBeTruthy();
  })
  it('should handle event: /delete-comment', () => {
    article.run('/delete-comment');
    expect(article.state).toBeTruthy();
  })
  it('should handle event: update-article', () => {
    article.run('update-article');
    expect(article.state).toBeTruthy();
  })
  xit('should handle event: update-follow', () => {
    article.run('update-follow');
    expect(article.state).toBeTruthy();
  })
  xit('should handle event: edit-article', () => {
    article.run('edit-article');
    expect(article.state).toBeTruthy();
  })
  it('should handle event: delete-article', () => {
    article.run('delete-article');
    expect(article.state).toBeTruthy();
  })
  xit('should handle event: ok-delete-article', () => {
    article.run('ok-delete-article');
    expect(article.state).toBeTruthy();
  })
  xit('should handle event: cancel-delete-article', () => {
    article.run('cancel-delete-article');
    expect(article.state).toBeTruthy();
  })
});
