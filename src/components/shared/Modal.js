import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           error:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           {props.authMessage}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function ModalComponent({showModal, message, clearError}) {
    const [modalShow, setModalShow] = React.useState(false);
    const handleShow = (showModal) => {
        if(showModal){
            return setModalShow(true);
        }
    }
    const handleShowAuth = (message) => {
        if(message){
            return setModalShow(true);
        }
    }
    useEffect( () => {
        handleShow(showModal);
        handleShowAuth(message);
    }, [showModal, message]);
  
    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          authMessage={message}
          text={showModal}
          onHide={() => {
            clearError()
            setModalShow(false)}}
        />
      </>
    );
  };
  
 export default ModalComponent;