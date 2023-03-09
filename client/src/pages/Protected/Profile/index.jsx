import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import FormInput from "../../../common/components/Shared/FormInput";
import PageHelmet from "../../../common/components/Shared/PageHelmet";
import {
  updateUserPassword,
  updateUserProfile,
} from "../../../features/user/userServices";

import SideBarLayout from "../../../layout/SideBarLayout";

const Profile = () => {
  const dispatch = useDispatch();
  const {userProfile, isMutation} = useSelector((state) => state.user);
  //MODALS
  const [profileModal, setProfileModal] = useState(false);
  const toggleProfileModal = () => setProfileModal(!profileModal);
  const [passModal, setPassModal] = useState(false);
  const togglePassModal = () => setPassModal(!passModal);

  //INPUTS_STATE
  //1)INFO[username-email-image]
  const [username, setUsername] = useState(userProfile?.user?.username);
  const [email, setEmail] = useState(userProfile?.user?.email);
  const [image, setImage] = useState(null);
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("username", username);
    formData.set("email", email);
    if (image) {
      formData.set("image", image);
    }
    dispatch(updateUserProfile(formData));
  };

  //2)PASSWORD[currentPassword-newPassword-confirmNewPassword]
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleChangePasses = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword(values));
  };

  return (
    <>
      <PageHelmet title={"Profile"} />
      <SideBarLayout>
        <section className="wishlist-section">
          <h4 className="mb-4">Profile</h4>

          {/* Profile Card */}
          <div
            className="d-flex flex-column align-items-center gap-3 text-center mx-auto"
            style={{
              maxWidth: "300px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              padding: "20px 10px",
              borderRadius: "20px",
            }}
          >
            {/* box-shadow: ; box-shadow: ;*/}
            <img
              src={userProfile?.user?.image}
              alt="user-img"
              width={100}
              height={100}
              className="rounded-circle"
            />
            <ul className="d-flex flex-column gap-2">
              <li>
                <span className="fw-bold">Username :</span>{" "}
                <span>{userProfile?.user?.username.toUpperCase()}</span>
              </li>
              <li>
                <span className="fw-bold">Email :</span>{" "}
                <span>{userProfile?.user?.email}</span>
              </li>
            </ul>
          </div>

          {/* Modals Buttons */}
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button color="info" onClick={toggleProfileModal}>
              Edit Profile
            </Button>
            <Button color="dark" onClick={togglePassModal}>
              Update Password
            </Button>
          </div>

          {/* Profile-Modal */}
          <Modal isOpen={profileModal} toggle={toggleProfileModal} centered>
            <ModalHeader toggle={toggleProfileModal}>Edit Profile</ModalHeader>
            <ModalBody>
              <Form>
                <FormInput
                  type="text"
                  name="username"
                  onChange={handleChangeUsername}
                  value={username}
                />
                <FormInput
                  type="email"
                  name="email"
                  onChange={handleChangeEmail}
                  value={email}
                />
                <Input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              {isMutation.loading ? (
                <Button color="primary" disabled>
                  <Spinner size={"sm"} />
                </Button>
              ) : (
                <Button
                  color="info"
                  onClick={(e) => {
                    handleUpdateProfile(e);
                    if (isMutation.loading === "false") {
                      toggleProfileModal();
                    }
                  }}
                >
                  Edit
                </Button>
              )}
              <Button color="primary" onClick={toggleProfileModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Password-Modal */}
          <Modal isOpen={passModal} toggle={togglePassModal} centered>
            <ModalHeader toggle={togglePassModal}>Update Password</ModalHeader>
            <ModalBody>
              <Form>
                <FormInput
                  type="password"
                  name="currentPassword"
                  onChange={handleChangePasses}
                  placeholder="Current Password"
                />
                <FormInput
                  type="password"
                  name="newPassword"
                  onChange={handleChangePasses}
                  placeholder="New Password"
                />
                <FormInput
                  type="password"
                  name="confirmNewPassword"
                  onChange={handleChangePasses}
                  placeholder="Confirm New Password"
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              {isMutation.loading ? (
                <Button color="info" disabled>
                  <Spinner size={"sm"} />
                </Button>
              ) : (
                <Button
                  color="info"
                  onClick={(e) => {
                    handleUpdatePassword(e);
                    if (isMutation.loading === "false") {
                      togglePassModal();
                    }
                  }}
                >
                  Update
                </Button>
              )}
              <Button color="primary" onClick={toggleProfileModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </section>
      </SideBarLayout>
    </>
  );
};

export default Profile;
