import "./WinnerModal.css";

const WinnerModal = ({show,handleClose,player}) => {
  return (
    <>
      {show ? (
        <div className="modal-backdrop">
          <div className="modal">
            <button className="close-button" onClick={()=>handleClose()}>
              &times;
            </button>
            <div className="modal-content">
              <p> {player} has won the Game ! </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WinnerModal
