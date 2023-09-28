
import { Toaster } from 'react-hot-toast';
import { WeatherApp } from './Components/WeatherApp/WeatherApp';
function App() {
  return (
    <div className="App">
      <Toaster />
      <WeatherApp/>
    </div>
  );
}

export default App;
