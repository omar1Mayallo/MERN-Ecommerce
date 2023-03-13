import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import FormInput from "../../../common/components/Shared/FormInput";

export const CreateCouponModal = ({
  modalState,
  toggle,
  ModalHead,
  handleCreateCoupon,
  handleChangeValues,
}) => {
  return (
    <Modal isOpen={modalState} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>{ModalHead}</ModalHeader>
      <ModalBody>
        <FormInput
          type="text"
          placeholder="Coupon Code"
          name="name"
          onChange={handleChangeValues}
        />
        <FormInput
          type="text"
          placeholder="Product ID"
          name="product"
          onChange={handleChangeValues}
        />
        <FormInput
          type="text"
          placeholder="Discount"
          name="discount"
          onChange={handleChangeValues}
        />
        <Input
          className="mt-3"
          name="expire"
          placeholder="Expiration Date"
          type="date"
          onChange={handleChangeValues}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="info"
          onClick={() => {
            handleCreateCoupon();
            toggle();
          }}
        >
          Create
        </Button>
        <Button color="primary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export const UpdateCouponModal = ({
  modalState,
  toggle,
  ModalHead,
  handleUpdateCoupon,
  getDateToInput,
  coupon,
  setCoupon,
}) => {
  return (
    <Modal isOpen={modalState} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>{ModalHead}</ModalHeader>
      <ModalBody>
        <FormInput
          type="text"
          placeholder="Coupon Code"
          name="name"
          value={coupon?.name}
          handleChange={(e) => setCoupon({...coupon, name: e.target.value})}
        />
        <FormInput
          type="text"
          placeholder="Product ID"
          name="product"
          value={coupon?.product}
          handleChange={(e) => setCoupon({...coupon, product: e.target.value})}
        />
        <FormInput
          type="text"
          placeholder="Discount"
          name="discount"
          value={coupon?.discount}
          handleChange={(e) => setCoupon({...coupon, discount: e.target.value})}
        />
        <Input
          type="date"
          className="mt-3"
          name="expire"
          value={getDateToInput(coupon?.expire)}
          onChange={(e) => setCoupon({...coupon, expire: e.target.value})}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="info"
          onClick={() => {
            handleUpdateCoupon();
            toggle();
          }}
        >
          Edit
        </Button>
        <Button color="primary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
