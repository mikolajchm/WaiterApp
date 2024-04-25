import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Table from "./components/pages/Table";
import NotFound from "./components/pages/NotFound";
import Header from "./components/views/Header";
import Footer from "./components/views/Footer";
import {useDispatch} from 'react-redux'
import { fetchTables } from "./redux/tablesRedux";
import { fetchStatus } from "./redux/statusRedux";
import { useEffect } from "react";


function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables()), [dispatch])
  useEffect(() => dispatch(fetchStatus()), [dispatch])

  return (
    <main>
       <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table/:id" element={<Table />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Container>
    </main>
  );
}

export default App;