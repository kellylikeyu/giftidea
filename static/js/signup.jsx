"use strict";

function Signup() {
  return (
    <React.Fragment>
      <div className="title-block">
      <h2>Create a New Account</h2>
      <ReactBootstrap.Form>
       
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
          controlId="formHorizontalPassword"
        >
          <ReactBootstrap.Form.Label column sm={2}>
            Password
          </ReactBootstrap.Form.Label>
          <ReactBootstrap.Col sm={10}>
            <ReactBootstrap.Form.Control
              type="password"
              placeholder="Password"
            />
          </ReactBootstrap.Col>
        </ReactBootstrap.Form.Group>
        <fieldset>
          <ReactBootstrap.Form.Group className="mb-3">
            <ReactBootstrap.Form.Label as="legend" column sm={2}>
              Radios
            </ReactBootstrap.Form.Label>
            <ReactBootstrap.Col sm={10}>
              <ReactBootstrap.Form.Check
                type="radio"
                label="first radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <ReactBootstrap.Form.Check
                type="radio"
                label="second radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <ReactBootstrap.Form.Check
                type="radio"
                label="third radio"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </ReactBootstrap.Col>
          </ReactBootstrap.Form.Group>
        </fieldset>
        <ReactBootstrap.Form.Group
          className="mb-3"
          controlId="formHorizontalCheck"
        >
          <ReactBootstrap.Col sm={{ span: 10, offset: 2 }}>
            <ReactBootstrap.Form.Check label="Remember me" />
          </ReactBootstrap.Col>
        </ReactBootstrap.Form.Group>

        <ReactBootstrap.Form.Group className="mb-3">
          <ReactBootstrap.Col sm={{ span: 10, offset: 2 }}>
            <ReactBootstrap.Button type="submit">Sign in</ReactBootstrap.Button>
          </ReactBootstrap.Col>
        </ReactBootstrap.Form.Group>
      </ReactBootstrap.Form>
      </div>
    </React.Fragment>
  );
}

ReactDOM.render(<Signup />, document.getElementById("signup"));
