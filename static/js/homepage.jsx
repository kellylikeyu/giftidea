"use strict";
function Banner() {
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <React.Fragment>
      <ReactBootstrap.Carousel activeIndex={index} onSelect={handleSelect}>
        <ReactBootstrap.Carousel.Item>
          <img
            className="full-width"
            src="/static/img/birthday.jpg"
            alt="First slide"
          />
          <ReactBootstrap.Carousel.Caption>
            <div>
              <h1>
                <b>Welcome to Gift Idea</b>
              </h1>
              <h3>
                Find the perfect gift for everyone on your list, no matter your
                budget.
              </h3>
            </div>
            <div>
              <p>
                <b>Sign up to ask and share your ideas with people</b>
              </p>
              <ReactBootstrap.Button
                variant="primary"
                href="/signup"
                id="button-carousel"
              >
                Get Started
              </ReactBootstrap.Button>
            </div>
          </ReactBootstrap.Carousel.Caption>
        </ReactBootstrap.Carousel.Item>
        <ReactBootstrap.Carousel.Item>
          <img
            className="full-width"
            src="/static/img/christmas.jpg"
            alt="Second slide"
          />

          <ReactBootstrap.Carousel.Caption>
            <div>
              <h1>
                <b>Welcome to Gift Idea</b>
              </h1>
              <h3>
                Find the perfect gift for everyone on your list, no matter your
                budget.
              </h3>
            </div>
            <div>
              <p>
                <b>Sign up to ask and share your ideas with people</b>
              </p>
              <ReactBootstrap.Button
                variant="primary"
                href="/signup"
                id="button-carousel"
              >
                Get Started
              </ReactBootstrap.Button>
            </div>
          </ReactBootstrap.Carousel.Caption>
        </ReactBootstrap.Carousel.Item>
        <ReactBootstrap.Carousel.Item>
          <img
            className="full-width"
            src="/static/img/her.jpg"
            alt="Third slide"
          />
          <ReactBootstrap.Carousel.Caption>
            <div>
              <h1>
                <b>Welcome to Gift Idea</b>
              </h1>
              <h3>
                Find the perfect gift for everyone on your list, no matter your
                budget.
              </h3>
            </div>
            <div>
              <p>
                <b>Sign up to ask and share your ideas with people</b>
              </p>
              <ReactBootstrap.Button
                variant="primary"
                href="/signup"
                id="button-carousel"
              >
                Get Started
              </ReactBootstrap.Button>
            </div>
          </ReactBootstrap.Carousel.Caption>
        </ReactBootstrap.Carousel.Item>
        <ReactBootstrap.Carousel.Item>
          <img
            className="full-width"
            src="/static/img/him.jpg"
            alt="Fourth slide"
          />
          <ReactBootstrap.Carousel.Caption>
            <div>
              <h1>
                <b>Welcome to Gift Idea</b>
              </h1>
              <h3>
                Find the perfect gift for everyone on your list, no matter your
                budget.
              </h3>
            </div>
            <div>
              <p>
                <b>Sign up to ask and share your ideas with people</b>
              </p>
              <ReactBootstrap.Button
                variant="primary"
                href="/signup"
                id="button-carousel"
              >
                Get Started
              </ReactBootstrap.Button>
            </div>
          </ReactBootstrap.Carousel.Caption>
        </ReactBootstrap.Carousel.Item>
      </ReactBootstrap.Carousel>
    </React.Fragment>
  );
}

function CardGroup() {
  return (
    <React.Fragment>
      <div className="card-group">
        <ReactBootstrap.Card>
          <ReactBootstrap.Card.Img variant="top" src="/static/img/search.jpg" />
          <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title>
              Search for Gift Idea
            </ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text>
              Given the gender, age, hobby and your budget, we will find the
              perfect gift for your loved ones.
            </ReactBootstrap.Card.Text>
            <ReactBootstrap.Button
              variant="primary"
              href="/search"
              id="card-button"
            >
              Search
            </ReactBootstrap.Button>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>

        <ReactBootstrap.Card>
          <ReactBootstrap.Card.Img variant="top" src="/static/img/ask.jpg" />
          <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title>
              Ask for Gift Idea
            </ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text>
              Not satisfied with the searching result? Looking for a second
              opinion? Just ask!
            </ReactBootstrap.Card.Text>
            <ReactBootstrap.Button
              variant="primary"
              href="/ask"
              id="card-button"
            >
              Ask
            </ReactBootstrap.Button>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>

        <ReactBootstrap.Card>
          <ReactBootstrap.Card.Img variant="top" src="/static/img/share.jpg" />
          <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title>
              Share Gift Idea
            </ReactBootstrap.Card.Title>
            <ReactBootstrap.Card.Text>
              Want to help others find a gift to celebrate? Please share your
              opinion. Tons of questions are waiting for your suggestions.
            </ReactBootstrap.Card.Text>
            <ReactBootstrap.Button
              variant="primary"
              href="/ask"
              id="card-button"
            >
              Share
            </ReactBootstrap.Button>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      </div>
    </React.Fragment>
  );
}

function Homepage() {
  return (
    <React.Fragment>
      <Banner />
      <CardGroup />
    </React.Fragment>
  );
}
ReactDOM.render(<Homepage />, document.getElementById("homepage"));
