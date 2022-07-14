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
            id="submit-button"
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
      <div className="title-block">
        <h2>Add Your Question</h2>
        <div className="criteria-block">
          <ReactBootstrap.Form.Control
            as="select"
            value={criteria.gender}
            name="gender"
            onChange={handleChange}
          >
            <option value="">Choose a gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Either gender">Either gender</option>
            <option value="Couple">Couple</option>
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
            <option value="Art">Art</option>
            <option value="Craft">Craft</option>
            <option value="Creative">Creative</option>
            <option value="Fashion">Fashion</option>
            <option value="Garderning">Garderning</option>
            <option value="Household">Household</option>
            <option value="Intellectual">Intellectual</option>
            <option value="Music">Music</option>
            <option value="Natual">Natual</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Sport">Sport</option>
            <option value="Technology">Technology</option>
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
        </div>
        <ReactBootstrap.Button
          variant="primary"
          onClick={handleSubmit}
          type="submit"
          id="submit-button"
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
      <div>
        <form onSubmit={handleSubmit}>
          <div className="answer">
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
              id="submit-button"
            >
              Submit
            </ReactBootstrap.Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

function AddLike(props) {
  const [likes, setLikes] = React.useState(props.initialLikes);
  const [disabled, setDisabled] = React.useState(false);
  const answerId = props.answerId;

  React.useEffect(getLikes, []);

  function getLikes() {
    console.log("success");
    fetch(`/likes?answerId=${answerId}`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.history) {
          console.log(jsonResponse.history);
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      });
  }

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
      <span className="heart-like">
        <button className="like-button" disabled={disabled}>
          <i
            className="material-icons"
            onClick={() => {
              if (!disabled) {
                handleClick();
                setDisabled(true);
              }
            }}
          >
            favorite
          </i>
        </button>
        {likes} likes
      </span>
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
              <p> Gender - {newQuestion.gender} </p>
              <p> Age - {newQuestion.age} </p>
              <p> Who likes {newQuestion.hobby} </p>
              <p> Under ${newQuestion.price} </p>
            </div>
          ) : (
            <div>
              <p>Someone is looking for similar gifts</p>
              <p> Gender - {newQuestion.gender} </p>
              <p> Age - {newQuestion.age} </p>
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
          <ReactBootstrap.Button
            variant="secondary"
            onClick={handleClose}
            id="submit-button"
          >
            Close
          </ReactBootstrap.Button>
        </ReactBootstrap.Modal.Footer>
      </ReactBootstrap.Modal>
      <div className="title-block">
        <h2>Questions</h2>
        <div>
          {questions.length > 0 &&
            questions.map((question) => (
              <div className="question-block" key={question.id}>
                <ReactBootstrap.ListGroup>
                  <ReactBootstrap.ListGroup.Item>
                    {question.id}. <b>Gender:</b> {question.gender} <b>Age:</b>{" "}
                    {question.age} <b>Hobby:</b> {question.hobby} <b>Price:</b>{" "}
                    Under ${question.price}
                  </ReactBootstrap.ListGroup.Item>
                  <ReactBootstrap.ListGroup.Item>
                    Suggestions:{" "}
                    {question.answers.length > 0 &&
                      question.answers.map((answer) => (
                        <li className="right" key={answer.id}>
                          {answer.gift_name}
                          <AddLike
                            answerId={answer.id}
                            initialLikes={answer.num_likes}
                            setShowModal={setShowModal}
                            setHeading={setHeading}
                          />
                        </li>
                      ))}
                    <br />
                    <AddAnswer
                      addAnswer={refreshQuestions}
                      questionId={question.id}
                      setShowModal={setShowModal}
                      setHeading={setHeading}
                    />
                  </ReactBootstrap.ListGroup.Item>
                </ReactBootstrap.ListGroup>
              </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}

ReactDOM.render(
  <QuestionAnswerContainer />,
  document.getElementById("ask-question")
);
