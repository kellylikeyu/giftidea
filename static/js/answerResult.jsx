"use strict";

function AlertModal(props) {
  const [show, setShow] = React.useState(props.showModal);
  const [heading, setHeading] = React.useState(props.heading);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      <ReactBootstrap.Modal show={show} onHide={props.handleModalClose}>
        <ReactBootstrap.Modal.Header closeButton></ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>{heading}</ReactBootstrap.Modal.Body>
        <ReactBootstrap.Modal.Footer>
          <ReactBootstrap.Button
            variant="primary"
            onClick={props.handleModalClose}
          >
            Close
          </ReactBootstrap.Button>
        </ReactBootstrap.Modal.Footer>
      </ReactBootstrap.Modal>
    </React.Fragment>
  );
}

function AddQuestion(props) {
  const [criteria, setCriteria] = React.useState({
    gender: "Choose a gender",
    age: "Choose an age range",
    price: "Choose your budget",
    hobby: "Choose a hobby",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(criteria),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.success) {
          props.setHeading(jsonResponse.message);
          props.setShowModal(true);
          console.log("true");
          return;
        }

        const questionAdded = jsonResponse.questionAdded;
        if (jsonResponse.status) {
          props.addQuestion(questionAdded);
        }
        props.handleShow();

        props.popQuestion(questionAdded);
      });
  };
  return (
    <React.Fragment>
      <div className="ask-criteria">
        <h2>Add your question</h2>
        <ReactBootstrap.Form.Control
          as="select"
          value={criteria.gender}
          name="gender"
          onChange={handleChange}
        >
          <option value="">Choose a gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="either gender">Either gender</option>
          <option value="couple">Couple</option>
        </ReactBootstrap.Form.Control>

        <ReactBootstrap.Form.Control
          as="select"
          value={criteria.age}
          name="age"
          onChange={handleChange}
        >
          <option value="">Choose an age range</option>
          <option value="0-2">0-2</option>
          <option value="2-6">2-6</option>
          <option value="6-18">6-18</option>
          <option value="18-40">18-40</option>
          <option value="40-60">40-60</option>
          <option value="Over 60">Over 60</option>
        </ReactBootstrap.Form.Control>

        <ReactBootstrap.Form.Control
          as="select"
          value={criteria.hobby}
          name="hobby"
          onChange={handleChange}
        >
          <option value="">Choose a hobby</option>
          <option value="art">Art</option>
          <option value="craft">Craft</option>
          <option value="creative">Creative</option>
          <option value="fashion">Fashion</option>
          <option value="garderning">Garderning</option>
          <option value="household">Household</option>
          <option value="intellectual">Intellectual</option>
          <option value="music">Music</option>
          <option value="natual">Natual</option>
          <option value="outdoor">Outdoor</option>
          <option value="sport">Sport</option>
          <option value="technology">Technology</option>
        </ReactBootstrap.Form.Control>

        <ReactBootstrap.Form.Control
          as="select"
          value={criteria.price}
          name="price"
          onChange={handleChange}
        >
          <option value="">Choose your budget</option>
          <option value="25">Under $25</option>
          <option value="50">Under $50</option>
          <option value="100">Under $100</option>
          <option value="150">Under $150</option>
          <option value="200">Under $200</option>
          <option value="250">Over $200</option>
        </ReactBootstrap.Form.Control>

        <ReactBootstrap.Button
          variant="primary"
          onClick={handleSubmit}
          type="submit"
        >
          Ask
        </ReactBootstrap.Button>
      </div>
    </React.Fragment>
  );
}

function AddAnswer(props) {
  const [answer, setAnswer] = React.useState("");
  const questionId = props.questionId;
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer: answer, questionId: questionId }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.success) {
          props.setHeading(jsonResponse.message);
          props.setShowModal(true);
          return;
        }

        const answerAdded = jsonResponse.answerAdded;
        props.addAnswer(answerAdded);
        setAnswer("");
      });
  };
  return (
    <React.Fragment>
      <div className="answer">
        <form onSubmit={handleSubmit}>
          <ReactBootstrap.FloatingLabel
            controlId="floatingTextarea"
            label="Your suggestion here"
            className="mb-3"
          >
            <ReactBootstrap.Form.Control
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              id="answerInput"
              as="textarea"
              placeholder="Leave an answer here"
            />
          </ReactBootstrap.FloatingLabel>
          <ReactBootstrap.Button
            variant="primary"
            type="submit"
            onSubmit={handleSubmit}
          >
            Submit
          </ReactBootstrap.Button>
        </form>
      </div>
    </React.Fragment>
  );
}

function AddLike(props) {
  const [likes, setLikes] = React.useState(props.initialLikes);
  const [disabled, setDisabled] = React.useState(false);
  const answerId = props.answerId;

  function handleClick() {
    fetch("/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answerId: answerId }),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.success) {
          props.setHeading(jsonResponse.message);
          props.setShowModal(true);
          return;
        } else if (jsonResponse.history) {
          setDisabled(true);
        } else {
          const likeNum = jsonResponse.likeNum;
          setLikes(likeNum);
        }
      });
  }

  return (
    <React.Fragment>
      <button disabled={disabled}>
        <i
          className="material-icons"
          onClick={() => {
            if (!disabled) {
              handleClick();
              setDisabled(true);
            }
          }}
          style={{ color: "red" }}
        >
          favorite
        </i>
      </button>
      {likes} likes
    </React.Fragment>
  );
}

function QuestionAnswerContainer(props) {
  const [questions, setQuestions] = React.useState([]);
  //   const [answer, setAnswer] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [showSuccessfulAdded, setShowSuccessfulAdded] = React.useState(false);
  const [newQuestion, setNewQuestion] = React.useState({});

  const [showModal, setShowModal] = React.useState(false);
  const [heading, setHeading] = React.useState("");

  const handleModalShow = () => setShowModal(true);

  const handleModalClose = () => setShowModal(false);

  function handleClose() {
    setShow(false);
    setShowSuccessfulAdded(false);
    setNewQuestion({});
  }

  const handleShow = () => setShow(true);

  function addQuestion(newQuestion) {
    setShowSuccessfulAdded(true);
    setQuestions([...questions, newQuestion]);
  }

  function popQuestion(newQuestion) {
    setNewQuestion(newQuestion);
  }

  function refreshQuestions() {
    fetch("/questions")
      .then((response) => response.json())
      .then((questionsJSON) => setQuestions(questionsJSON.questions));
  }

  React.useEffect(refreshQuestions, []);

  return (
    <React.Fragment>
      <AddQuestion
        addQuestion={addQuestion}
        handleShow={handleShow}
        popQuestion={popQuestion}
        setShowModal={setShowModal}
        setHeading={setHeading}
      />

      {showModal && (
        <AlertModal
          showModal={showModal}
          heading={heading}
          handleModalShow={handleModalShow}
          handleModalClose={handleModalClose}
        />
      )}

      <ReactBootstrap.Modal show={show} onHide={handleClose}>
        <ReactBootstrap.Modal.Header closeButton>
          <ReactBootstrap.Modal.Title>
            {showSuccessfulAdded ? (
              <p> You post question successfully </p>
            ) : (
              <p> This question has been posted </p>
            )}
          </ReactBootstrap.Modal.Title>
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          {showSuccessfulAdded ? (
            <div>
              <p>Looking for a gift for your loved one</p>
              <p> Gender- {newQuestion.gender} </p>
              <p> Age- {newQuestion.age} </p>
              <p> Who likes {newQuestion.hobby} </p>
              <p> Under ${newQuestion.price} </p>
            </div>
          ) : (
            <div>
              <p>Someone is looking for similar gifts</p>
              <p> Gender- {newQuestion.gender} </p>
              <p> Age- {newQuestion.age} </p>
              <p> Who likes {newQuestion.hobby} </p>
              <p> Under ${newQuestion.price} </p>
              <p> Under Question {newQuestion.id}</p>
              <p> Suggestions we have so far:</p>
              {newQuestion.answers &&
                newQuestion.answers.length > 0 &&
                newQuestion.answers.map((answer) => (
                  <li key={answer.id}>{answer.gift_name}.</li>
                ))}
            </div>
          )}
        </ReactBootstrap.Modal.Body>
        <ReactBootstrap.Modal.Footer>
          <ReactBootstrap.Button variant="secondary" onClick={handleClose}>
            Close
          </ReactBootstrap.Button>
        </ReactBootstrap.Modal.Footer>
      </ReactBootstrap.Modal>

      <h2>Questions</h2>

      {questions.length > 0 &&
        questions.map((question) => (
          <div className="red" key={question.id}>
            {question.id}. Gender: {question.gender}, Age: {question.age},
            Price: ${question.price}, Hobby: {question.hobby}. <br />
            Suggestions:{" "}
            {question.answers.length > 0 &&
              question.answers.map((answer) => (
                <li key={answer.id}>
                  {answer.gift_name}.
                  <AddLike
                    answerId={answer.id}
                    initialLikes={answer.num_likes}
                    setShowModal={setShowModal}
                    setHeading={setHeading}
                  />
                </li>
              ))}
            <AddAnswer
              addAnswer={refreshQuestions}
              questionId={question.id}
              setShowModal={setShowModal}
              setHeading={setHeading}
            />
          </div>
        ))}
    </React.Fragment>
  );
}

ReactDOM.render(
  <QuestionAnswerContainer />,
  document.getElementById("ask-question")
);
