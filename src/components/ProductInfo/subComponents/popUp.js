import React from 'react'
import { Modal } from 'react-bootstrap'
function ModalDialog({popUpData}) {
  return (
    <>
      <Modal show={true}>
        <Modal.Header  >
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Uploaded the prescription!
         <br />
         FileName :- {popUpData}
        </Modal.Body>
      </Modal>
    </>
  )
}
export default ModalDialog