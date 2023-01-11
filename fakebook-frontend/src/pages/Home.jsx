import Contact from "../components/contact/Contact";
import "./Home.css"
const Home = ({ contacts }) => {


    return (
        <main className="homeMain">
            <h2>home</h2>
            <section className="contactsGrid">
                {contacts?.map((contact, key) => {
                    return <Contact key={key} contact={contact} />
                })}
            </section>
        </main>);
}

export default Home;