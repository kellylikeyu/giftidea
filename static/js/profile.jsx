"use strict";

function UserProfile() {

  
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
  