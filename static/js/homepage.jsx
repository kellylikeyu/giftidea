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
            className="homepage-image"
            src="/static/img/birthday.jpg"
            alt="First slide"
          />
          <ReactBootstrap.Carousel.Caption>
            <div className="carousel-caption-1">
              <h1>Wellcome to Gift Idea</h1>
              <h2>
                Find the perfect gift for everyone on your list, no matter your
                budget.
              </h2>
              <p>Sign up to ask and share your ideas with people</p>
              <ReactBootstrap.Button variant="primary" href="/signup">
                Sign up
              </ReactBootstrap.Button>
            </div>
          </ReactBootstrap.Carousel.Caption>
        </ReactBootstrap.Carousel.Item>
        <ReactBootstrap.Carousel.Item>
          <img
            className="homepage-image"
            src="/static/img/christmas.jpg"
            alt="Second slide"
          />

          <ReactBootstrap.Carousel.Caption>
            <h1>Welcome to Gift Idea</h1>
            <h2>
              Find the perfect gift for everyone on your list, no matter your
              budget.
            </h2>
            <p>Sign up to ask and share your ideas with people</p>
            <ReactBootstrap.Button variant="primary" href="/signup">
              Sign up
            </ReactBootstrap.Button>
          </ReactBootstrap.Carousel.Caption>
        </ReactBootstrap.Carousel.Item>
        <ReactBootstrap.Carousel.Item>
          <img
            className="homepage-image"
            src="/static/img/her.jpg"
            alt="Third slide"
          />
          {/* 
          <ReactBootstrap.Carousel.Caption>
            <h1>Wellcome to Gift Idea</h1>
            <p>
              Find the perfect gift for everyone on your list, no matter your
              budget.
            </p>
          </ReactBootstrap.Carousel.Caption> */}
        </ReactBootstrap.Carousel.Item>
        <ReactBootstrap.Carousel.Item>
          <img
            className="homepage-image"
            src="/static/img/him.jpg"
            alt="Fourth slide"
          />
          {/* <ReactBootstrap.Carousel.Caption>
            <h1>Wellcome to Gift Idea</h1>
            <p>
              Find the perfect gift for everyone on your list, no matter your
              budget.
            </p>
          </ReactBootstrap.Carousel.Caption> */}
        </ReactBootstrap.Carousel.Item>
      </ReactBootstrap.Carousel>
    </React.Fragment>
  );
}

function CardGroup() {
  return (
    <React.Fragment>
      <ReactBootstrap.Card style={{ width: "18rem" }}>
        <ReactBootstrap.Card.Img variant="top" src="/static/img/search.jpg" />
        <ReactBootstrap.Card.Body>
          <ReactBootstrap.Card.Title>
            Search for Gift Idea
          </ReactBootstrap.Card.Title>
          <ReactBootstrap.Card.Text>
            Given the gender, age, hobby and your budget, we will find the
            perfect gift for your loved ones.
          </ReactBootstrap.Card.Text>
          <ReactBootstrap.Button variant="primary" href="/search">
            Search
          </ReactBootstrap.Button>
        </ReactBootstrap.Card.Body>
      </ReactBootstrap.Card>

      <ReactBootstrap.Card style={{ width: "18rem" }}>
        <ReactBootstrap.Card.Img variant="top" src="/static/img/ask.jpg" />
        <ReactBootstrap.Card.Body>
          <ReactBootstrap.Card.Title>
            Ask for Gift Idea
          </ReactBootstrap.Card.Title>
          <ReactBootstrap.Card.Text>
            Not satisfied with the searching result? Looking for a second
            opinion? Just ask!
          </ReactBootstrap.Card.Text>
          <ReactBootstrap.Button variant="primary" href="/ask">
            Ask
          </ReactBootstrap.Button>
        </ReactBootstrap.Card.Body>
      </ReactBootstrap.Card>

      <ReactBootstrap.Card style={{ width: "18rem" }}>
        <ReactBootstrap.Card.Img variant="top" src="/static/img/share.jpg" />
        <ReactBootstrap.Card.Body>
          <ReactBootstrap.Card.Title>Share Gift Idea</ReactBootstrap.Card.Title>
          <ReactBootstrap.Card.Text>
            Want to help others find a gift to celebrate? Please share your
            opinion. Tons of questions are waiting for your suggestions.
          </ReactBootstrap.Card.Text>
          <ReactBootstrap.Button variant="primary" href="/ask">
            Share
          </ReactBootstrap.Button>
        </ReactBootstrap.Card.Body>
      </ReactBootstrap.Card>
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
