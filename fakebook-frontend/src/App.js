import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Nav from './components/nav/Nav';
import Add from './pages/Add';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';

function App() {
  const [contacts, setContacts] = useState([])
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKENDURL}/api/fakebook`)
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(data => {
        console.log(data)
        setContacts(data)
      })
      .catch(err => console.log(err))
  }, [refresh])

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path={'/'} element={<Home contacts={contacts} />} />
          <Route path={'/contact/:id'} element={<Detail refresh={refresh} setRefresh={setRefresh} contacts={contacts} />} />
          <Route path={'/new'} element={<Add refresh={refresh} setRefresh={setRefresh} />} />
          <Route path={'/edit/:id'} element={<Edit contacts={contacts} refresh={refresh} setRefresh={setRefresh} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
