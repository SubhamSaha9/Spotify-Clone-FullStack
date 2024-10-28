import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Addsong from "./components/admin/Addsong";
import ListSong from "./components/admin/ListSong";
import AddAlbum from "./components/admin/AddAlbum";
import ListAlbum from "./components/admin/ListAlbum";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/add-song" element={<Addsong />} />
          <Route path="/admin/add-album" element={<AddAlbum />} />
          <Route path="/admin/list-song" element={<ListSong />} />
          <Route path="/admin/list-album" element={<ListAlbum />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
