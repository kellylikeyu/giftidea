"use strict";

function AlertDismissible(props) {
  const [show, setShow] = React.useState(true);

  if (show) {
    return (
      <React.Fragment>
        <ReactBootstrap.Alert
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          <ReactBootstrap.Alert.Heading>Oh snap!</ReactBootstrap.Alert.Heading>
          <p>Email and password do not match. Please try again.</p>
        </ReactBootstrap.Alert>
      </React.Fragment>
    );
  }
}

function Login(props) {
  const [show, setShow] = React.useState(false);
  const [info, setInfo] = React.useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = React.useState(false);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    sessionStorage.clear();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (login === false) {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse.success) {
            props.setpasswordPass(false);
            return;
          } else {
            sessionStorage.setItem("username", jsonResponse.user);
            setLogin(true);
          }
        });
    }
  };
  return (
    <React.Fragment>
      <div className="position-right">
        {sessionStorage.getItem("username") ? (
          <ReactBootstrap.Navbar.Collapse className="justify-content-end">
            <div className="flex">
              {/* <ReactBootstrap.Navbar.Text> */}
                <div className="padding">
                  Logged in as:{" "}
                  <a href="/profile">{sessionStorage.getItem("username")}</a>
                </div>
                <div>
                  <ReactBootstrap.Button
                    variant="primary"
                    href="/logout"
                    onClick={handleLogout}
                    id="button-login"
                  >
                    Log out
                  </ReactBootstrap.Button>
                </div>
              {/* </ReactBootstrap.Navbar.Text> */}
            </div>
          </ReactBootstrap.Navbar.Collapse>
        ) : (
          <ReactBootstrap.Button
            variant="primary"
            onClick={handleShow}
            className="position-right"
            id="button-login"
          >
            Log in
          </ReactBootstrap.Button>
        )}
      </div>
      <ReactBootstrap.Modal show={show} onHide={handleClose}>
        <ReactBootstrap.Modal.Header closeButton>
          <ReactBootstrap.Modal.Title>Login</ReactBootstrap.Modal.Title>
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Form onSubmit={handleSubmit}>
          <ReactBootstrap.Modal.Body>
            <ReactBootstrap.Form.Group
              className="mb-3"
              controlId="formBasicEmail"
            >
              <ReactBootstrap.Form.Label>
                Email address
              </ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Control
                type="email"
                value={info.email}
                name="email"
                onChange={handleChange}
                placeholder="name@example.com"
              />
            </ReactBootstrap.Form.Group>
            <ReactBootstrap.Form.Group
              className="mb-3"
              controlId="formBasicPassword"
            >
              <ReactBootstrap.Form.Label>Password</ReactBootstrap.Form.Label>
              <ReactBootstrap.Form.Control
                type="password"
                value={info.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
            </ReactBootstrap.Form.Group>
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            <ReactBootstrap.Button
              variant="primary"
              type="submit"
              onClick={handleClose}
              id="button-login-form"
            >
              Log in
            </ReactBootstrap.Button>
            No account yet?{" "}
            <a href="/signup" id="link">
              Create new account
            </a>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Form>
      </ReactBootstrap.Modal>
    </React.Fragment>
  );
}

function Navbar(props) {
  const [passwordPass, setpasswordPass] = React.useState(true);
  return (
    <React.Fragment>
      <ReactBootstrap.Navbar bg="dark" variant="dark" className="nav-theme">
        <ReactBootstrap.Container className="full-width">
          <ReactBootstrap.Navbar.Brand href="/" className="nav-brand">
            <img
              alt=""
              src="/static/img/logo.jpg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Gift Idea
          </ReactBootstrap.Navbar.Brand>

          <ReactBootstrap.Nav className="justify-content-between">
            <div className="flex">
              <ReactBootstrap.Nav.Link href="/search" className="nav-link">
                Search
              </ReactBootstrap.Nav.Link>
              <ReactBootstrap.Nav.Link href="/ask" className="nav-link">
                Ask and Share
              </ReactBootstrap.Nav.Link>
            </div>
            <Login setpasswordPass={setpasswordPass} />
          </ReactBootstrap.Nav>
        </ReactBootstrap.Container>
        {!passwordPass && <AlertDismissible />}
      </ReactBootstrap.Navbar>

      <br />
    </React.Fragment>
  );
}

ReactDOM.render(<Navbar />, document.getElementById("navbar"));
