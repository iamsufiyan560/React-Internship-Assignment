import UserForm from "./components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Table from "./components/Table";
import userAtom from "./atoms/userAtom";
import { useRecoilValue } from "recoil";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/data" /> : <UserForm />}
        />
        <Route path="/data" element={!user ? <Navigate to="/" /> : <Table />} />
      </Routes>
    </>
  );
}

export default App;
