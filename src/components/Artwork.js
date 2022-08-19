import "./Artwork.css";

const Artwork = ({ artwork, setShowModal, setIdToDelete }) => {
  return (
    <>
      <tr className="table-row">
        <td className="centered">{artwork.title}</td>
        <td className="centered">{artwork.artist_titles}</td>
        <td className="centered">{artwork.date_display}</td>
        <td>
          <button
            type="button"
            className="centered button-delete"
            onClick={() => {
              setIdToDelete(artwork.id);
              setShowModal(true);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Artwork;
