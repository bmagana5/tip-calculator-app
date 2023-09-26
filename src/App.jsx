import { ReactComponent as Logo } from "./assets/images/logo.svg";
import Calculator from "./components/calculator/calculator.component";

import './App.scss';

const App = () => {
  return (
    <div className='background'>
      <div className="logo-container">
        <Logo/>
      </div>
      <Calculator/>
    </div>
  );
};

export default App;
