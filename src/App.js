import "./styles.css";
import axios from "axios";
import Artwork from "./components/Artwork";
import { useEffect, useState } from "react";
import DeleteConfirmation from "./components/DeleteConfirmation";

/* Dummy Data with same fields for testing */
const DUMMY_DATA = [
  {
    id: "263705",
    title: "Corrugated Vase",
    date_display: "2018",
    artist_titles: "Aranda Lasch",
    date_end: 1945
  },
  {
    id: "156575",
    title: "Horse Hair and Wood 02",
    date_display: "1941",
    artist_titles: "Billy Artman",
    date_end: 1850
  },
  {
    id: "263705",
    title: "Chicago 42",
    date_display: "2014",
    artist_titles: "Ansel Adams",
    date_end: 1920
  }
];

export default function App() {
  const [artworkList, setArtworkList] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("ASC");
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const sortByYearsHandler = () => {
    //retrieved end date of artwork and sorted by date
    //sorts into ascending and descending order
    if (order === "ASC") {
      const sortedArtwork = [...artworkList].sort(
        (a, b) => Number(a.date_end) - Number(b.date_end)
      );
      setArtworkList(sortedArtwork);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sortedArtwork = [...artworkList].sort(
        (a, b) => Number(b.date_end) - Number(a.date_end)
      );
      setArtworkList(sortedArtwork);
      setOrder("ASC");
    }
  };

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        // const res = await axios.get(
        //   "https://api.artic.edu/api/v1/artworks?fields=id,title,date_display,artist_titles,date_end"
        // );
        // setArtworkList(res.data.data);
        setArtworkList(DUMMY_DATA);
      } catch (err) {
        console.log(err);
        setError("Error fetching artwork at this time.");
      }
    };
    fetchArtwork();
  }, []);

  const handleRemoveRow = (artworkId) => {
    //finds the index of the art work that is intended
    //for removal. Id to delete value comes from
    //Artwork Component
    const updatedArtwork = [...artworkList];
    const index = artworkList.findIndex((artwork) => artwork.id === artworkId);
    updatedArtwork.splice(index, 1);
    setArtworkList(updatedArtwork);
    setShowModal(false);
    setIdToDelete(null);
  };

  if (error) return <div>{error}</div>;

  //Inserts a symbol (up or down) based upon ascending
  //or descending
  const sortingButton = order === "ASC" ? <>&#8595;</> : <>&#8593;</>;

  return (
    <div className="App">
      <div className="description-wrapper">
        <h1>Chicago Institute of Art – Works of Art</h1>
        <p>
          Render list of artwork in table format showing: Artwork Title, Artist
          Name and Display Date. Table should allow for deleting individual rows
          and sorting by date.
        </p>
      </div>
      {showModal && (
        <DeleteConfirmation
          className=""
          deleteRow={handleRemoveRow}
          idToDelete={idToDelete}
          setShowModal={setShowModal}
        />
      )}
      <table>
        <thead>
          <tr>
            <th className="centered">Title</th>
            <th className="centered">Artist Name</th>
            <th className="centered display-date">
              <div className="display-date__title">Display Date</div>
              <button className="button-sort" onClick={sortByYearsHandler}>
                {sortingButton}
              </button>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/*Maps over artwork retrieved and passes removal handler
          and also the key if duplicates arise within data in 
          the future */}
          {artworkList.map((artwork, key) => {
            return (
              <Artwork
                className="table-row"
                artwork={artwork}
                key={key}
                deleteRow={handleRemoveRow}
                setIdToDelete={setIdToDelete}
                setShowModal={setShowModal}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
