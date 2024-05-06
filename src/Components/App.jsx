import Carousel from "./Carousel";

function App() {
  return (
    <div className="App">
      <h1
        style={{
          margin: "10px",
          textAlign: "center",
          position: "sticky",
          top: "0",
        }}
      >
        Simple Carousel
      </h1>
      <Carousel />
    </div>
  );
}

export default App;
