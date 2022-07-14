"use strict";

function Search(props) {
  const [criteria, setCriteria] = React.useState({
    gender: "Choose a gender",
    age: "Choose an age range",
    price: "Choose your budget",
    hobby: "Choose a hobby",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      console.log("HERE", criteria);
      fetch("/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(criteria),
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          const searchResults = jsonResponse.searchResults;
          props.addResults(searchResults);
          setLoading(false);
        });
    }
  }, [isLoading]);

  const handleSubmitClick = () => setLoading(true);

  return (
    <React.Fragment>
      <div className="title-block">
        <h2>Search a gift</h2>
        <div className="criteria-block">
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
        </div>
        <ReactBootstrap.Button
          variant="primary"
          disabled={isLoading}
          onClick={!isLoading ? handleSubmitClick : null}
          type="submit"
          id="submit-button"
        >
          {isLoading ? "Loading…" : "Search"}
        </ReactBootstrap.Button>
      </div>
    </React.Fragment>
  );
}

function SearchResultsContainer(props) {
  const [results, setResults] = React.useState([]);

  function addResults(newResults) {
    setResults(newResults);
  }

  return (
    <React.Fragment>
      <Search addResults={addResults} />
      {results.length == 0 && (
        <div className="search-block">
          <h2>Recommanded Gift Ideas</h2>
          <div>
            <ReactBootstrap.Figure>
              <ReactBootstrap.Figure.Image
                width={304}
                height={320}
                alt="304x320"
                src="https://images.uncommongoods.com/images/items/22200/22272_2_360px.webp"
              />
              <ReactBootstrap.Figure.Caption>
                Intersection of Love - Photo Print
              </ReactBootstrap.Figure.Caption>
            </ReactBootstrap.Figure>
            <ReactBootstrap.Figure>
              <ReactBootstrap.Figure.Image
                width={304}
                height={320}
                alt="304x320"
                src="https://images.uncommongoods.com/images/items/43000/43038_1_640px.webp"
              />
              <ReactBootstrap.Figure.Caption>
                Long Distance Friendship Lamp
              </ReactBootstrap.Figure.Caption>
            </ReactBootstrap.Figure>
            <ReactBootstrap.Figure>
              <ReactBootstrap.Figure.Image
                width={304}
                height={320}
                alt="304x320"
                src="https://images.uncommongoods.com/images/items/40100/40120_6_640px.webp"
              />
              <ReactBootstrap.Figure.Caption>
                Compact Swivel Cheese Board with Knives
              </ReactBootstrap.Figure.Caption>
            </ReactBootstrap.Figure>
            <ReactBootstrap.Figure>
              <ReactBootstrap.Figure.Image
                width={304}
                height={320}
                alt="304x320"
                src="https://images.uncommongoods.com/images/items/26000/26073_6_640px.webp"
              />
              <ReactBootstrap.Figure.Caption>
                New York Times Custom Birthday Book
              </ReactBootstrap.Figure.Caption>
            </ReactBootstrap.Figure>
          </div>
        </div>
      )}
      <div>
        {results.length > 0 && (
          <div className="title-block">
            <h3> Search Result </h3>
            <div className="grid">
              {results.map((result) => (
                <div key={result.id}>
                  <ReactBootstrap.Figure>
                    <ReactBootstrap.Figure.Image
                      width={304}
                      height={320}
                      alt="304x320"
                      src={result.image}
                    />
                    <ReactBootstrap.Figure.Caption>
                      {result.title}<br />
                      <a href={result.full_link}>Purchase link</a> <br />
                      Price: ${result.price} <br />
                    </ReactBootstrap.Figure.Caption>
                  </ReactBootstrap.Figure>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

ReactDOM.render(
  <SearchResultsContainer />,
  document.getElementById("search_result")
);
