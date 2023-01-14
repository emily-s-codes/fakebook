import Contact from "../components/contact/Contact";
import Pagination from "../components/pagination/Pagination";
import "./Home.css"
const Home = ({ currentRecords, loading, nPages, currentPage, setCurrentPage }) => {


    return (
        <main className="homeMain">
            {loading && <section>
                <p>Your address book is loading ...</p>
            </section>}
            <section className="contactsGrid">
                {currentRecords?.map((contact, key) => {
                    return <Contact key={key} contact={contact} />
                })}
            </section>
            <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </main>);
}

export default Home;