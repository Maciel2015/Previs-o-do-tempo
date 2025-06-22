import { useState, useRef } from 'react';
import axios from 'axios';
import './App.css';
import WeatherInformations from './components/WeatherInformations/WeatherInformations';
import WeatherInformations4Days from './components/WeatherInformations4Days/WeatherInformations4Days';





function App() {
  const [weather, setWeather] = useState();
  const [weather4Days, setWeather4Days] = useState();
  const [loading, setLoading] = useState(false); // 🔄 novo estado
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value.trim();
    if (!city) return;

    setLoading(true); // ⏳ começa carregamento

    const key = "db7b7bc027154e381a343d44a38830f8";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt_br&units=metric`;

    try {
      const [resToday, res4Days] = await Promise.all([
        axios.get(url),
        axios.get(url5Days),
      ]);
      setWeather(resToday.data);
      setWeather4Days(res4Days.data);
    } catch (error) {
      alert('Cidade não encontrada.');
    } finally {
      setLoading(false); // ✅ encerra carregamento
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      searchCity();
    }
  }

  return (
    <div className="container">
      <h1>🌤️ Previsão do Tempo</h1>

      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite o nome da cidade"
          onKeyDown={handleKeyPress}
        />
        <button onClick={searchCity}>Buscar</button>
      </div>

      {loading && <p className="loading">Carregando dados...</p>}

      {!loading && weather && <WeatherInformations weather={weather} />}
      {!loading && weather4Days && <WeatherInformations4Days weather4Days={weather4Days} />}
    </div>
  );
}

export default App;
