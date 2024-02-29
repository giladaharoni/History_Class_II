import { useLocation } from 'react-router-dom';

export default function LearnMode() {
    let location = useLocation();
    const jsonData = location.state;
    console.log(jsonData)
    localStorage.setItem('lesson_id', jsonData['lesson']);
    const figure = (figure) => (
        <div class="card" style={{width: '18rem'}}>
            <img src={figure['description']} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{figure['Name']}</h5>
                    <p class="card-text">{figure['picture']}</p>
                </div>
        </div>

    )
    const event = (event) => (
        <div className="accordion-item">
            <h3>
                    {event['Title']}
            </h3>
            <div id={event['Title']} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    {event['description']}
            </div>
        </div>)
    const period = (period) => (
        <div className="accordion-item">
            <h3>
                    {period['Title']}
            </h3>
            <div id={period['Title']} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    {period['description']}
            </div>
        </div>
        
    )
    const column = (Title, display_func, entities) => (
        <div class="accordion" id="accordionExample" style={{ backgroundColor: 'lightgray', padding: '10px' }}>
            <div> {Title} </div>
            {entities.map((entity, idx) => (
                display_func(entity)
            ))}
        </div>
    )
    return (
        <div>learning mode page
            <button className="register-button"><a href="\SelectLesson" className="link-primary">select another lesson</a></button>
            <div class="container text-center">
                <div class="row align-items-start">
                    <div class="col">
                        {column("Historic Periods and Wars", period, jsonData['wars and periods'])}
                    </div>
                    <div class="col">
                        {column("Signficant events", event, jsonData['events'])}

                    </div>
                    <div class="col">
                        {column("Important Figures", figure, jsonData['figures'])}
                    </div>
                </div>
            </div>
            <button className="register-button"><a href="\TestMode" className="link-primary">Test Mode</a></button>
        </div>

    )
};