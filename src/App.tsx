import './App.scss';
import ThemeGenerator from './pages/ThemeGenerator';
import modranLogo from './resources/img/logo.svg';

function App() {
  return (
    <>
    <header>
      <img style={{width:90}} src={modranLogo} alt='logo da modran'/>
      <div className='creator-info'>
        <h1>
          made by: <a target='_blank' rel="noreferrer" href='https://www.instagram.com/thailonlucas'>@thailonlucas</a>
        </h1>
      </div>
    </header>
    <ThemeGenerator/>
    </>
  );
}

export default App;
