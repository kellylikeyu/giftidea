"use strict";

function Search(props) {
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
      });
  };
  return (
    <React.Fragment>
      <h2>Search a gift</h2>
      <div className="search-criteria">
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
                Under $25
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
            Choose hobbies:
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
          <button type="submit">Search</button>
        </form>
      </div>
    </React.Fragment>
  );
}

function SearchResultsContainer(props) {
  const [results, setResults] = React.useState([]);

  function addResults(newResults) {
    setResults(newResults);
  }
  console.log("result:", results);
  return (
    <React.Fragment>
      <Search addResults={addResults} />
      <div>
        {results.length > 0 && (
          <div>
            <h3> Search Result </h3>
            <div>
              {results.map((result) => (
                <div key={result.id}>
                  <img src={result.image} alt="profile" />
                  <br />
                  {result.title},<br />
                  <a href={result.full_link}>Purchase link</a>, <br />
                  price: ${result.price}, <br />
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
