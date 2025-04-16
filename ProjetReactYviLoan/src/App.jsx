import './App.css';
import Footer from './footer/footer.jsx';
import {Outlet} from "react-router-dom"; // Importation du footer

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Accueil</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <Footer /> {/* Ajout du footer */}
    </>
  );
}

export default App;