# MangaDB Client App

![@Rafase282](https://avatars0.githubusercontent.com/Rafase282?&s=128)

Created by Rafase282

[Github](https://github.com/Rafase282) | [FreeCodeCamp](http://www.freecodecamp.com/rafase282) | [CodePen](http://codepen.io/Rafase282/) | [LinkedIn](https://www.linkedin.com/in/rafase282) | [Blog/Site](https://rafase282.wordpress.com/) | [E-Mail](mailto:rafase282@gmail.com)

The Front-End for the MangaDB app

[![Gitter](https://badges.gitter.im/Rafase282/Mangadb.svg)](https://gitter.im/Rafase282/Mangadb?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![bitHound Overall Score](https://www.bithound.io/github/Rafase282/mangadb-front/badges/score.svg)](https://www.bithound.io/github/Rafase282/mangadb-front) [![bitHound Dependencies](https://www.bithound.io/github/Rafase282/mangadb-front/badges/dependencies.svg)](https://www.bithound.io/github/Rafase282/mangadb-front/master/dependencies/npm) [![bitHound Dev Dependencies](https://www.bithound.io/github/Rafase282/mangadb-front/badges/devDependencies.svg)](https://www.bithound.io/github/Rafase282/mangadb-front/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/Rafase282/mangadb-front/badges/code.svg)](https://www.bithound.io/github/Rafase282/mangadb-front)

## Backend Source Code

[MangaDB Secure RSTful API](https://github.com/Rafase282/Mangadb)

## Testing

1. Create an **.env** file:
```bash
API=https://api-hostname/api // The url for the api
HOST=https://client-hostname/reset //the URL for this client pointing to /reset
PORT=xxxx // The port the server will be runing on
secret="the secret!" // Secret for security purpose
```
2. Run the server with `node ./bin/www`
3. Run the gulp task `gulp`.

It will open a new browser-sync instance with the preview.

## To-Do

- [ ] Create React single Page.
- [X] Fix Manga Form
- [X] Fix Tootltips not showing on Manga Card
- [X] Fix Error Page
- [X] Test Whole Site
- [X] Implement Fixed Size for Manga Cards
- [X] Fix the Too Manu Redirects Issue
- [ ] Implement password Recovery and reset.
