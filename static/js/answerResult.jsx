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
    gender: "female",
    age: "0-2",
    price: "10",
    hobby: "art",
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
      <h2>Add your question</h2>
      <div className="question-criteria">
        <form onSubmit={handleSubmit}>
          <label>
            Choose a gender:
            <select
              value={criteria.gender}
              name="gender"
              onChange={handleChange}
            >
              <option value="female" name="gender" id="gender-female">
                Female
              </option>
              <option value="male" name="gender" id="gender-male">
                Male
              </option>
              <option value="either gender" name="gender" id="gender-either">
                Either gender
              </option>
              <option value="couple" name="gender" id="gender-couple">
                Couple
              </option>
            </select>
          </label>
          <label>
            Choose an age:
            <select value={criteria.age} name="age" onChange={handleChange}>
              <option value="0-2" name="age" id="age-1">
                0-2
              </option>
              <option value="2-6" name="age" id="age-2">
                2-6
              </option>
              <option value="6-18" name="age" id="age-3">
                6-18
              </option>
              <option value="18-40" name="age" id="age-4">
                18-40
              </option>
              <option value="40-60" name="age" id="age-5">
                40-60
              </option>
              <option value="Over 60" name="age" id="age-6">
                Over 60
              </option>
            </select>
          </label>
          <label>
            Choose price range:
            <select value={criteria.price} name="price" onChange={handleChange}>
              <option value="25" name="price" id="price-1">
                Under $20
              </option>
              <option value="50" name="price" id="price-2">
                Under $50
              </option>
              <option value="100" name="price" id="price-3">
                Under $100
              </option>
              <option value="150" name="price" id="price-4">
                Under $150
              </option>
              <option value="200" name="price" id="price-5">
                Under $200
              </option>
              <option value="250" name="price" id="price-6">
                Over $200
              </option>
            </select>
          </label>
          <label>
            Choose a hobby:
            <select value={criteria.hobby} name="hobby" onChange={handleChange}>
              <option value="art" name="hobby" id="hobby-art">
                Art
              </option>
              <option value="craft" name="hobby" id="hobby-craft">
                Craft
              </option>
              <option value="creative" name="hobby" id="hobby-creative">
                Creative
              </option>
              <option value="fashion" name="hobby" id="hobby-fashion">
                Fashion
              </option>
              <option value="garderning" name="hobby" id="hobby-garderning">
                Garderning
              </option>
              <option value="household" name="hobby" id="hobby-household">
                Household
              </option>
              <option value="intellectual" name="hobby" id="hobby-intellectual">
                Intellectual
              </option>
              <option value="music" name="hobby" id="hobby-music">
                Music
              </option>
              <option value="natual" name="hobby" id="hobby-natual">
                Natual Lover
              </option>
              <option value="outdoor" name="hobby" id="hobby-outdoor">
                Outdoor
              </option>
              <option value="sport" name="hobby" id="hobby-sport">
                Sport
              </option>
              <option value="technology" name="hobby" id="hobby-technology">
                Technology
              </option>
            </select>
          </label>
          <button type="submit">Ask</button>
        </form>
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
      });
  };
  return (
    <React.Fragment>
      <p>Share your suggestion</p>
      <div className="answer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="answerInput">
            <input
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              id="answerInput"
            />
          </label>
          <button type="submit" onSubmit={handleSubmit}>
            Submit
          </button>
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
