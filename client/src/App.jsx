import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import UserContextProvider from './UserContext';
import NewBookPage from './pages/NewBookPage';
import BooksPage from './pages/BooksPage';
import { useState } from 'react';
import ChaptersPage from './pages/ChaptersPage';
import CharactersPage from './pages/CharactersPage';
import NewCharacterPage from './pages/NewCharacterPage';
import EditCharacterPage from './pages/EditCharacterPage';
import EditBookPage from './pages/EditBookPage';
import NewChapterPage from './pages/NewChapterPage';
import EditChapterPage from './pages/EditChapterPage';
import WorldBuildingPage from './pages/WorldBuildingPage';
import OutlinesPage from './pages/OutlinesPage';
import NewOutlinePage from './pages/NewOutlinePage';
import EditOutlinePage from './pages/EditOutlinePage';
import IdeasPage from './pages/IdeasPage';
import NewIdeaPage from './pages/NewIdeaPage';
import EditIdeaPage from './pages/EditIdeaPage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  const [chapters, setChapters] = useState([]);
  const [characters, setCharacters] = useState([]);


  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={ <Layout/> }>
          <Route index element={ <HomePage/> }/>
          <Route path='/login' element={ <LoginPage/> }/>
          <Route path='/register' element={ <RegisterPage/> } />
          <Route path='/books/new' element={ <NewBookPage/> }/>
          <Route path='/books' element={ <BooksPage/> }/>
          <Route path='/books/:id/edit' element={ <EditBookPage chapters={chapters} setChapters={setChapters} characters={characters} setCharacters={setCharacters} /> } />
          <Route path='/books/:id/chapters' element={ <ChaptersPage chapters={chapters} setChapters={setChapters}/> }/>
          <Route path='/books/:id/characters' element={ <CharactersPage characters={characters} setCharacters={setCharacters}/> }/>
          <Route path='/books/:id/characters/new' element={ <NewCharacterPage characters={characters} setCharacters={setCharacters}/> }/>
          <Route path='/books/:id/characters/:characterId' element={ <EditCharacterPage/> }/>
          <Route path='/books/:id/chapters/new' element={ <NewChapterPage chapters={chapters} setChapters={setChapters}/> }/>
          <Route path='/books/:id/chapters/:chapterIndex' element={ <EditChapterPage chapters={chapters} setChapters={setChapters}/>}/>
          <Route path='/books/:id/world-building' element={ <WorldBuildingPage/> }/>
          <Route path='/books/:id/outlines' element={ <OutlinesPage/> }/>
          <Route path='/books/:id/outlines/new' element={ <NewOutlinePage/> }/>
          <Route path='/books/:id/outlines/:outlineIndex' element={ <EditOutlinePage/> }/>
          <Route path='/ideas' element={ <IdeasPage/> }/>
          <Route path='/ideas/new' element={ <NewIdeaPage/> }/>
          <Route path='/ideas/edit/:ideaIndex' element={ <EditIdeaPage/> }/>
        </Route>  
      </Routes>
    </UserContextProvider>
  )
}

export default App
