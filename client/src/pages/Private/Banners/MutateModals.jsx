import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

const CreateBannerModal = ({
  modalState,
  toggle,
  ModalHead,
  handleChangeImage,
  handleCreateBanner,
}) => {
  return (
    <Modal isOpen={modalState} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>{ModalHead}</ModalHeader>
      <ModalBody>
        <Input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="info"
          onClick={() => {
            handleCreateBanner();
            toggle();
          }}
        >
          Upload
        </Button>
        <Button color="primary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateBannerModal;
