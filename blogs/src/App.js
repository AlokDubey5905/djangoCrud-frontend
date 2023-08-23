import './App.css';
import BlogList from './components/allBlogs';
import Home from './components/home';
import Signup from './components/signup';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blogger</h1>
      </header>
      <main>
        {/* <BlogList/> */}
        <Home/>
        {/* <Signup/> */}
      </main>
    </div>
  );
}

export default App;
