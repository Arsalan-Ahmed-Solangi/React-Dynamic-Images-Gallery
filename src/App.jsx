import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [value, setValue] = useState("");

  const getData = async () => {
    try {
      const getPhotos = await fetch("https://dummyjson.com/products");
      if (!getPhotos.ok) throw new Error("Failed to fetch data");
      const photos = await getPhotos.json();
      setOriginalData(photos.products);
      setFilteredData(photos.products);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      toast.error("Something went wrong" + error);
    }
  };

  const searchImage = () => {
    const searchedImages = originalData.filter((item) =>
      item.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(searchedImages);
    setValue("");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="container-fluid">
          <h4 className="text-light">LOADING PHOTOS</h4>
        </div>
      ) : (
        <div className="container-fluid">
          <h4 className="text-light">Dynamic Filtered Gallery</h4>
          <div className="input-group">
            <input
              onChange={(e) => setValue(e.target.value)}
              value={value}
              type="text"
              placeholder="Search By Category"
              className="form-control"
            />
            <button
              onClick={searchImage}
              className="btn btn-warning text-light"
            >
              <i className="fa fa-search"></i>
            </button>
          </div>
          <hr />
          <div className="row">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  className="col-md-3 col-lg-3 col-xs-12 col-sm-12 mb-4"
                >
                  <div className="card shadow-sm bg-white p-0">
                    <img
                      src={item.thumbnail}
                      className="card-img-top"
                      style={{ height: 150, objectFit: "fit" }}
                      alt="..."
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="col text-center">
                <p>No images found</p>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
