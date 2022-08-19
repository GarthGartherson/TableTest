import "./DeleteConfirmation.css";

function DeleteConfirmation({
  deleteRow,
  artworkId,
  idToDelete,
  setShowModal
}) {
  return (
    <div className="overlay">
      <div className="modal">
        <h3 className="modal-title">Are you sure you want to delete?</h3>
        <div className="buttons-validation">
          <button
            className="button-cancel"
            onClick={() => {
              setShowModal(false);
            }}
          >
            No
          </button>
          <button
            className="button-confirm"
            onClick={() => deleteRow(idToDelete)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
