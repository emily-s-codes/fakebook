import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';
import Add from './pages/Add';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Home from './pages/Home';

function App() {
  const [contacts, setContacts] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 6
  const [totalCount, setTotalCount] = useState(0)

  const indexOfLast = currentPage * recordsPerPage
  const indexOfFirst = indexOfLast - recordsPerPage
  const nPages = Math.ceil(contacts.length / recordsPerPage)
  const currentRecords = contacts.slice(indexOfFirst, indexOfLast)

  const onPageChange = () => {

  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKENDURL}/api/fakebook`)
      .then(res => {
        setLoading(false)
        return res.json()
      })
      .then(data => {
        setTotalCount(data.length)
        setContacts(data)
      })
      .catch(err => console.log(err))
  }, [refresh])

  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path={'/'} element={<Home recordsPerPage={recordsPerPage} onPageChange={onPageChange} totalCount={totalCount} currentRecords={currentRecords} loading={loading} nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
          <Route path={'/contact/:id'} element={<Detail refresh={refresh} setRefresh={setRefresh} contacts={contacts} />} />
          <Route path={'/new'} element={<Add refresh={refresh} setRefresh={setRefresh} />} />
          <Route path={'/edit/:id'} element={<Edit contacts={contacts} refresh={refresh} setRefresh={setRefresh} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
