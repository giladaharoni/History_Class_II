import { useState } from "react";
export default function SelectLesson(){
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

    const numRows = 20;
    const numCols = 20;

  // Initialize the grid with numbers and a selected state
    const initialGrid = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex) => ({
      number: rowIndex * numCols + colIndex + 1,
      selected: false,
    }))
  );

  const [grid, setGrid] = useState(initialGrid);

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
    return(
        <div>
            <div>select lesson page</div>

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
      <div>Selectable Tiles Grid:</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numCols}, 60px)`, justifyContent: 'center', alignItems: 'center' }}>
        {grid.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <button type="button" className={`btn ${tile.selected ? 'selected' : ''}`}
              key={`${rowIndex}-${colIndex}`}
              style={{
                border: '1px solid #ccc',
                width: '60px',
                height: '30px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: tile.selected ? 'blue' : 'white',
              }}
              onClick={() => handleTileClick(rowIndex, colIndex)}
            >
              {tile.number}
            </button>
          ))
        )}
      </div>
    </div>
            <div>
              <p>
                Chosen years were: {selectedYears.length > 0 ? `${startYear} until ${endYear}` : 'None'}
              </p>
              <p>
                Chosen numbers were: {selectedNumbers.length > 0 ? selectedNumbers.join(', ') : 'None'}
              </p>
          </div>
          <button   className="register-button"><a href= "\LearnMode" className="link-primary">Learn Mode</a></button>
          <button   className="register-button"><a href= "\TestMode" className="link-primary">Test Mode</a></button>
          <button   className="register-button"><a href= "\ScoreBoard" className="link-primary">go to scoreboard</a></button>
        </div>

        


        


    )
};