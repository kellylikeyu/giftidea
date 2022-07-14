"use strict";

function Profile() {
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    fetch("/user")
      .then((response) => response.json())
      .then((userJSON) => {
        console.log(userJSON);
        setUser(userJSON.user);
      });
  }, []);
  console.log(user.hobbies, typeof user.hobbies);

  return (
    <React.Fragment>
      <div class="title-block">
        <h2>Account Information</h2>
        <ReactBootstrap.ListGroup>
          <ReactBootstrap.ListGroup.Item>
            <b>Your username: </b>
            {user.username}
          </ReactBootstrap.ListGroup.Item>
          <ReactBootstrap.ListGroup.Item>
            <b>Your email: </b>
            {user.email}
          </ReactBootstrap.ListGroup.Item>
          <ReactBootstrap.ListGroup.Item>
            <b>Your gender: </b>
            {user.gender}
          </ReactBootstrap.ListGroup.Item>
          <ReactBootstrap.ListGroup.Item>
            <b>Your age: </b>
            {user.age}
          </ReactBootstrap.ListGroup.Item>
          <ReactBootstrap.ListGroup.Item>
            <b>Your hobby: </b>
            {user &&
              user.hobbies.length > 0 &&
              user.hobbies.map((hobby) => <span> {hobby}</span>)}
          </ReactBootstrap.ListGroup.Item>
        </ReactBootstrap.ListGroup>
      </div>
      <div className="title-block">
        <h2>Account Activities</h2>
        <ReactBootstrap.Accordion defaultActiveKey={["0"]} alwaysOpen>
          <ReactBootstrap.Accordion.Item eventKey="0">
            <ReactBootstrap.Accordion.Header>
              Your ask history
            </ReactBootstrap.Accordion.Header>
            <ReactBootstrap.Accordion.Body>
              {user &&
                user.questions.length > 0 &&
                user.questions.map((question) => (
                  <div className="activities" key={question.id}>
                    <ReactBootstrap.ListGroup>
                      <ReactBootstrap.ListGroup.Item>
                        <b>Your question:</b>
                        Gender: {question.gender}, Age: {question.age}, Hobby:{" "}
                        {question.hobby}, Price: ${question.price}. <br />
                        <b>Current suggestions:</b>{" "}
                        {question.answers.length > 0 &&
                          question.answers.map((answer) => (
                            <li key={answer.id}>{answer.gift_name}</li>
                          ))}
                      </ReactBootstrap.ListGroup.Item>
                    </ReactBootstrap.ListGroup>
                  </div>
                ))}
            </ReactBootstrap.Accordion.Body>
          </ReactBootstrap.Accordion.Item>
          <ReactBootstrap.Accordion.Item eventKey="1">
            <ReactBootstrap.Accordion.Header>
              Your answer history
            </ReactBootstrap.Accordion.Header>
            <ReactBootstrap.Accordion.Body>
              {user &&
                user.answers.length > 0 &&
                user.answers.map((answer) => (
                  <div className="activities" key={answer.id}>
                    <ReactBootstrap.ListGroup>
                      <ReactBootstrap.ListGroup.Item>
                        <b>Question:</b>
                        Gender: {answer.gender}, Age: {answer.age}, Hobby:{" "}
                        {answer.hobby}, Price: ${answer.price}. <br />
                        <b>Your answer:</b> {answer.gift}
                      </ReactBootstrap.ListGroup.Item>
                    </ReactBootstrap.ListGroup>
                  </div>
                ))}
            </ReactBootstrap.Accordion.Body>
          </ReactBootstrap.Accordion.Item>
          <ReactBootstrap.Accordion.Item eventKey="2">
            <ReactBootstrap.Accordion.Header>
              Your like history
            </ReactBootstrap.Accordion.Header>
            <ReactBootstrap.Accordion.Body>
              {user &&
                user.likes.length > 0 &&
                user.likes.map((like) => (
                  <div className="activities" key={like.id}>
                    <ReactBootstrap.ListGroup>
                      <ReactBootstrap.ListGroup.Item>
                        <b>Question:</b>
                        Gender: {like.gender}, Age: {like.age}, Hobby:{" "}
                        {like.hobby}, Price: ${like.price}. <br />
                        <b>Your liked answer:</b> {like.gift}
                      </ReactBootstrap.ListGroup.Item>
                    </ReactBootstrap.ListGroup>
                  </div>
                ))}
            </ReactBootstrap.Accordion.Body>
          </ReactBootstrap.Accordion.Item>
        </ReactBootstrap.Accordion>
      </div>
    </React.Fragment>
  );
}

ReactDOM.render(<Profile />, document.getElementById("profile"));
