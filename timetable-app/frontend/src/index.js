import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {StrictMode} from 'react';
import Index from './pages/index';
import Teacher from './pages/teacher/teacher';
import Room from './pages/room/room';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<Index/>}/>
                <Route path={'/teacher'} element={<Teacher/>}/>
                <Route path={'/room'} element={<Room/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
