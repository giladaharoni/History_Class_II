import { api_path } from "./constant";
import axios from "axios";
import { useEffect, useState } from "react";
export default function ScoreBoard(){
    const [records, setRecords] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(api_path + '/api/scoreboard');
            console.log(response)
            setRecords(response.data.board)

          } catch (error) {
          } finally {
          }
        };
    
        fetchData();
      }, []);
    return(
        <div>score page
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
                {console.log(record[1])}


            </tr>

                ))}
            
            </tbody>
        </table> 
        
        
        
        
        
        
            <button   className="register-button"><a href= "\SelectLesson" className="link-primary">select another lesson</a></button>
        </div>

    )
};