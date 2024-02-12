export default function ScoreBoard(){
    return(
        <div>score page
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
                <th scope="col">lesson</th>
                <th scope="col">time</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>

            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td >Larry the Bird</td>
                <td >Larry the Bird</td>
                <td>@twitter</td>
            </tr>
            </tbody>
        </table> 
        
        
        
        
        
        
            <button   className="register-button"><a href= "\SelectLesson" className="link-primary">select another lesson</a></button>
        </div>

    )
};