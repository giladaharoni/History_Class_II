import { api_path } from "./constant";
import axios from "axios";
import { useEffect, useState } from "react";
export default function ScoreBoard() {
    const [records, setRecords] = useState([]);
    const [recomended_countries, setRecomended] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(api_path + '/api/scoreboard');
          setRecords(response.data.board);
        } catch (error) {
          console.error('Error fetching scoreboard:', error);
        } finally {
          setLoading(false);
        }
      };
  
      const fetchRecomended = async () => {
        try {
          let user = localStorage.getItem('user_id');
          const response = await axios.get(api_path + '/api/recomended_countries?user_id=' + user);
          setRecomended(response.data);
        } catch (error) {
          console.error('Error fetching recommended countries:', error);
        } finally {
          setLoading(false);
        }
      };
  
      const fetchDataAndRecomended = async () => {
        setLoading(true);
        await fetchData();
        await fetchRecomended();
      };
  
      fetchDataAndRecomended();
    }, []);
    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         let user = localStorage.getItem('user_id')
    //         const response = await axios.get(api_path + '/api/recomended_countries?user_id='+user);
    //         console.log(response)
    //         setRecomended(response.data)

    //       } catch (error) {
    //       } finally {
    //       }
    //     };
    
    //     fetchData();
    //   }, []);
    return(
        <div>
        <h1>score page</h1>
        <table className="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
            </tr>
            </thead>
            <tbody>
                {records.map((record,index) => (
                    <tr>
                <th scope="row">{index+1}</th>
                <td>{record[0]}</td>
                <td>{parseFloat(record[1])}</td>



            </tr>

                ))}
            
            </tbody>
        </table> 
        
        
        
        
        
            <div>recomended countries to learn about according to your previous lessons are: {recomended_countries.join(', ')}</div>
            <button   className="register-button"><a href= "\SelectLesson" className="link-primary">select another lesson</a></button>
        </div>

    )
};
