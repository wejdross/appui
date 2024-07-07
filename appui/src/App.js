import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Appcat from './elems/appcat/appcat';
import { Routes, Route } from 'react-router-dom';
import * as React from 'react';
import PermanentDrawerLeft from './elems/mainlayout/drawer';


function App() {
  return (
    <>
      <PermanentDrawerLeft>
        <Routes>
          <Route path="/" element={<h1>someting here, no idea yet</h1>} />
          <Route path="/vshnpostgresql" element={<Appcat appcat="vshnpostgresql" />} />
          <Route path="/vshnmariadb" element={<Appcat appcat="vshnmariadb" />} />
          <Route path="/vshnkeycloak" element={<Appcat appcat="vshnkeycloak" />} />
          <Route path="/vshnredis" element={<Appcat appcat="vshnredis" />} />
          <Route path="/vshnminio" element={<Appcat appcat="vshnminio" />} />
        </Routes>
      </PermanentDrawerLeft>
    </>
  );
}

export default App;
