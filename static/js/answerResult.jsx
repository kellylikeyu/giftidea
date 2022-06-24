'use strict';

function QuestionsAnswers(props) {
   return (
    <div className="questions-answers">
        <h2>Questions</h2>
        <h3> Gender: {props.gender}, Age: {props.age}, 
            Price: {props.price}, Hobby: {props.hobby} </h3>
            <p>User suggestions:</p>
            <p>{props.answers.gift_name} {props.answers.num_likes} likes</p>
    </div>
   );
}

function AddQuestion(props) {
    const [ gender, setGender ] = React.useState("female");
    const [ age, setAge ] = React.useState("0-2");
    const [ price, setPrice ] = React.useState("10");
    const [ hobby, setHobby ] = React.useState("art");
    
    const handleGenderChange = ({ target }) => {
        const value = target.value;
        setGender(value);
    };
    // const handleChange = ({ target }, setState) => {
    //     const {value} = target;
    //     setState(value);
    // };
    const handleAgeChange = ({ target }) => {
        const value = target.value;
        setAge(value);
    };

    const handlePriceChange = ({ target }) => {
        const value = target.value;
        setPrice(value);
    };

    const handleHobbyChange = ({ target }) => {
        const value = target.value;
        setHobby(value);
    };
      
    const handleSubmit = e => {
        e.preventDefault();
        console.log("submited");
        fetch("/add-new-question", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ "gender": gender, "age": age,
                                   "price": price, "hobby": hobby}),
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
            const questionAdded = jsonResponse.questionAdded.id;
            console.log(questionAdded)
            props.addQuestion(questionAdded);
            });
    };
    return (
        <React.Fragment>
            <h2>Add your question</h2>
            <div className="question-criteria">
                <form onSubmit={handleSubmit}>
                    <label>
                        Choose a gender:
                        <select value={gender} onChange={handleGenderChange}>
                            <option value="female" name="gender" id="gender-female">Female</option>
                            <option value="male" name="gender" id="gender-male">Male</option>
                            <option value="either gender" name="gender" id="gender-either">Either gender</option>
                            <option value="couple" name="gender" id="gender-couple">Couple</option>
                        </select>
                    </label>
                    <label>
                        Choose an age:
                        <select value={age} onChange={handleAgeChange}>
                            <option value="0-2" name="age" id="age-1">0-2</option>
                            <option value="2-6" name="age" id="age-2">2-6</option>
                            <option value="6-18" name="age" id="age-3">6-18</option>
                            <option value="18-40" name="age" id="age-4">18-40</option>
                            <option value="40-60" name="age" id="age-5">40-60</option>
                            <option value="Over 60" name="age" id="age-6">Over 60</option>
                        </select>
                    </label>
                    <label>
                        Choose price range:
                        <select value={price} onChange={handlePriceChange}>
                            <option value="10" name="price" id="price-1">Under $10</option>
                            <option value="20" name="price" id="price-2">Under $20</option>
                            <option value="50" name="price" id="price-3">Under $50</option>
                            <option value="100" name="price" id="price-4">Under $100</option>
                            <option value="150" name="price" id="price-5">Under $150</option>
                            <option value="200" name="price" id="price-6">Under $200</option>
                            <option value="250" name="price" id="price-7">Over $200</option>
                        </select>
                    </label>
                    <label>
                        Choose a hobby:
                        <select value={hobby} onChange={handleHobbyChange}>
                            <option value="art" name="hobby" id="hobby-art">Art</option>
                            <option value="craft" name="hobby" id="hobby-craft">Craft</option>
                            <option value="creative" name="hobby" id="hobby-creative">Creative</option>
                            <option value="fashion" name="hobby" id="hobby-fashion">Fashion</option>
                            <option value="garderning" name="hobby" id="hobby-garderning">Garderning</option>
                            <option value="household" name="hobby" id="hobby-household">Household</option>
                            <option value="intellectual" name="hobby" id="hobby-intellectual">Intellectual</option>
                            <option value="music" name="hobby" id="hobby-music">Music</option>
                            <option value="natual" name="hobby" id="hobby-natual">Natual Lover</option>
                            <option value="outdoor" name="hobby" id="hobby-outdoor">Outdoor</option>
                            <option value="sport" name="hobby" id="hobby-sport">Sport</option>
                            <option value="technology" name="hobby" id="hobby-technology">Technology</option>
                        </select>
                    </label>
                    <button type="submit">Ask</button>
                </form>
            </div>          
        </React.Fragment>
    )  
}


function AddAnswer(props) {
   
}

function AddLikes(props) {
   
}

function QuestionAnswerContainer(props) {
   const [questions, setQuestions] = React.useState([])
   function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
    }
    React.useEffect(() => {
        fetch("/all-questions")
          .then((response) => response.json())
          .then((questionsJSON) => setQuestions(questionsJSON.questions));
      }, []);
    
    return (
        <React.Fragment>
            <AddQuestion addQuestion={addQuestion} />
            <h2>Questions</h2>
            <p>
                {questions.map((question) =>(
                    <li>
                        Gender: {question.gender}, 
                        Age: {question.age},
                        price: {queestion.price},
                        hobby: {question.hobby}.
                        Answers: {question.answers}.map((answer) =>(
                            <li>
                                                            </li>
                        ))
                    </li>
                ))}
            </p>
        </React.Fragment>
    );
}

ReactDOM.render(<AddQuestion />, document.getElementById('ask-question'));