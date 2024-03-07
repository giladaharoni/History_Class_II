import { useState, useEffect } from "react";
import axios from 'axios';
import { api_path } from "./constant";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function SelectLesson() {
  let navigate = useNavigate();
  const [startYear, setStartYear] = useState(-3000);
  const [endYear, setEndYear] = useState(2023);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const totalSelectedYears = selectedYears.reduce((sum, year) => sum + year, 0);
  const totalSelectedNumbers = selectedNumbers.reduce((sum, number) => sum + number, 0);
  const handleStartYearChange = (event) => {
    const newStartYear = parseInt(event.target.value, 10);
    setStartYear(newStartYear);
    if (newStartYear > endYear) {
      setEndYear(newStartYear);
    }
  };

  const handleEndYearChange = (event) => {
    const newEndYear = parseInt(event.target.value, 10);
    if (newEndYear >= startYear) {
      setEndYear(newEndYear);
    }
  };
  const [data, setData] = useState([[["1","2","3","5"]]]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leanred_countries, setLearned_countries] = useState([])
  const [countries_names, setLearned_countries_name] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api_path + '/api/all_countries');
        const rows = [];
        for (let index = 0; index < response.data.length; index += 8) {
          rows.push(response.data.slice(index, index + 8));
        }
        setData(rows);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const numRows = 20;
  const numCols = 20;



  const [grid, setGrid] = useState(data);

  const handleTileClick = (rowIndex, colIndex) => {
    setGrid((prevGrid) => {
      const updatedGrid = prevGrid.map((row, i) =>
        row.map((tile, j) => ({
          ...tile,
          selected: i === rowIndex && j === colIndex ? !tile.selected : tile.selected,
        }))
      );

      // Update selected years and numbers based on tile selection
      const selectedYear = startYear + rowIndex;
      const selectedNumber = rowIndex * numCols + colIndex + 1;

      if (updatedGrid[rowIndex][colIndex].selected) {
        setSelectedYears((prevSelectedYears) => [...prevSelectedYears, selectedYear]);
        setSelectedNumbers((prevSelectedNumbers) => [...prevSelectedNumbers, selectedNumber]);
      } else {
        setSelectedYears((prevSelectedYears) => prevSelectedYears.filter((year) => year !== selectedYear));
        setSelectedNumbers((prevSelectedNumbers) => prevSelectedNumbers.filter((number) => number !== selectedNumber));
      }

      return updatedGrid;
    });
  };

  const country_card = (country) => (
    <div class="col-4">
      <img src={country[2]}  width={50} height={50} alt=""></img>
      {country[1]}

    </div>
    
    
  )
  const onClickCountry = (id, name) => {
    let check = leanred_countries.indexOf(id)
    let check_name = countries_names.indexOf(name)
    
    if (check!=-1) {
      setLearned_countries(leanred_countries.toSpliced(check))


    } else {
      setLearned_countries([...leanred_countries,id])

    }
    if (check_name!=-1) {
      setLearned_countries_name(countries_names.toSpliced(check_name))


    } else {
      setLearned_countries_name([...countries_names,name])

    }
  };

  const toLearnMode = async () => {
    let user_id = localStorage.getItem('user_id')
    if (leanred_countries.length == 0) {
      alert("you have to choose countries")
      return
    }
    let body = {user:user_id, start_year:startYear,end_year:endYear, countries:leanred_countries}
    console.log(body)
    try {
      const response = await axios.post(api_path+"/api/learn", body, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      navigate('/LearnMode',{ state: response.data });
    } catch (error) {
      
    }
    

    
  }

  const grid_render=(() =>{
    return (
      <div className="container">
        {data.map((rowCountries, rowIndex) => (
          <div key={rowIndex} className="row">
            {rowCountries.map((country, countryIndex) => (
              <div key={countryIndex} className="card" style={{ width: '10rem' }}>
              <img src={country[2]} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{country[1]}</h5>
                <button className="btn btn-primary" onClick={()=>{onClickCountry(country[0],country[1])}}>add to lesson</button>
              </div>
            </div>
            
            ))}
            
          </div>
        ))}
      </div>
    );
  })
  return (
    <div>
      <h1>select lesson page</h1>

      <div>Please select year range:</div>
      <div>
        <label htmlFor="startYear" className="form-label">
          Start Year: {startYear}
        </label>
        <input
          type="range"
          className="form-range"
          min="-3000"
          max="2023"
          id="startYear"
          value={startYear}
          onChange={handleStartYearChange}
        />

        <label htmlFor="endYear" className="form-label">
          End Year: {endYear}
        </label>
        <input
          type="range"
          className="form-range"
          min={startYear}
          max="2023"
          id="endYear"
          value={endYear}
          onChange={handleEndYearChange}
        />
      </div>
      <div>
        <p>
          Chosen years were: { startYear + ' until ' + endYear}
        </p>
        <p>
          Chosen numbers were: { countries_names.join(', ') }
        </p>
      </div>
      <button className="register-button"><a onClick={()=>(toLearnMode())} className="link-primary">Learn Mode</a></button>
      <button className="register-button"><a href="\TestMode" className="link-primary">Test Mode</a></button>
      <button className="register-button"><a href="\ScoreBoard" className="link-primary">go to scoreboard</a></button>
      <div>
        <div>Select countries:</div>
        <div>
          {grid_render()}
        </div>
      </div>

    </div>







  )
};