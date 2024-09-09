import React, { useEffect , useState} from "react";
import { PiAt, PiImage, PiPassword, PiTextAUnderline, PiUser } from "react-icons/pi";
import { registerUrl, loginUrl } from "../../../Api/constants/url";
import useFetch from "../../../Api/FetchHook";
import useLogin from "../../../Api/Login";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal";

/**
 * displays the registration form
 */

const RegistrationForm = () => {
    const { performFetch, data, error, loading } = useFetch(registerUrl);
    const { login, loggedIn } = useLogin(loginUrl);
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
  
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      avatar: {
        url: "https://img.freepik.com/premium-vector/vector-flat-illustration-black-line-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-802.jpg?w=1380",
        alt: "",
      },
      venueManager: false,
    });
  
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
  
    useEffect(() => {
      if (data && !error) {
        console.log("Registration successful, logging in...");
        login({ email: formData.email, password: formData.password });
      }
    }, [data, error, login, formData]);
  
    useEffect(() => {
      if (loggedIn) {
        console.log("Login successful, redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }, [loggedIn, navigate]);
  
    useEffect(() => {
      validateForm();
    }, [formData]);
  
    const closeModal = () => {
      setShowModal(false);
      setIsSuccess(false);
    };
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };
  
    const handleAvatarChange = (event) => {
      setFormData({
        ...formData,
        avatar: {
          ...formData.avatar,
          [event.target.name]: event.target.value,
        },
      });
    };
  
    const handleCheckboxChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.checked,
      });
    };
  
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@stud\.noroff\.no$/;
      return emailRegex.test(email);
    };
  
    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
      return passwordRegex.test(password);
    };
  
    const validateForm = () => {
      const errors = {};
      if (!formData.name) {
        errors.name = "Username is required.";
      }
      if (!validateEmail(formData.email)) {
        errors.email = "Email must be a valid @stud.noroff.no address.";
      }
      if (!validatePassword(formData.password)) {
        errors.password =
          "Password must contain at least one uppercase letter and one number.";
      }
      if (formData.password !== formData.repeatPassword) {
        errors.repeatPassword = "Passwords do not match.";
      }
  
      setFormErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (isFormValid) {
        setShowModal(true);
        performFetch({
          method: "POST",
          body: JSON.stringify(formData),
        }).then(() => {
          setIsSuccess(true);
        });
      }
    };
  
    return (
      <div className="flex justify-center">
        <Modal isOpen={showModal} onClose={closeModal} isSuccess={isSuccess}>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data && <p>Success! Data received.</p>}
        </Modal>
        <form
          onSubmit={handleSubmit}
          className="flex-col align-middle bg-white p-4 rounded-25"
        >
          <div className="border-b pb-12">
            <h2 className="leading-7">Register your Profile</h2>
            <p className="mt-1 text-sm text-wrap leading-6 text-gray-600">
              Some of this information will be displayed publicly so be careful
              what you share.
            </p>
            <div className="text-left mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-4">
              <div className="sm:col-span-4">
                <div className="flex">
                  <PiUser className="mr-2 h-6 w-6" />
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6"
                  >
                    Username *
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="username"
                    className="block w-full rounded-md border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Your username"
                    required
                  />
                  {formErrors.name && (
                    <p className="text-black text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className="flex">
                  <PiAt className="mr-2 h-6 w-6" />
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6"
                  >
                    Email address *
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="user.last@stud.noroff.no"
                    required
                  />
                  {formErrors.email && (
                    <p className="text-black text-xs mt-1">{formErrors.email}</p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className="flex">
                  <PiPassword className="mr-2 h-6 w-6" />
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6"
                  >
                    Password *
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    className="block w-full rounded-md border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                  {formErrors.password && (
                    <p className="text-black text-xs mt-1">
                      {formErrors.password}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className="flex">
                  <PiPassword className="mr-2 h-6 w-6" />
                  <label
                    htmlFor="repeatPassword"
                    className="block text-sm font-medium leading-6"
                  >
                    Repeat Password *
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    type="password"
                    name="repeatPassword"
                    id="repeatPassword"
                    autoComplete="new-password"
                    className="block w-full rounded-md border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    required
                  />
                  {formErrors.repeatPassword && (
                    <p className="text-black text-xs mt-1">
                      {formErrors.repeatPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className="flex">
                  <PiImage className="mr-2 h-6 w-6" />
                  <label
                    htmlFor="avatarUrl"
                    className="block text-sm font-medium leading-6"
                  >
                    Avatar URL
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleAvatarChange}
                    type="text"
                    name="url"
                    value={formData.avatar.url}
                    id="avatarUrl"
                    className="block w-full rounded-md border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Valid image address goes here"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className="flex">
                  <PiTextAUnderline className="mr-2 h-6 w-6" />
                  <label
                    htmlFor="avatarAlt"
                    className="block text-sm font-medium leading-6"
                  >
                    Avatar Alt Text
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={handleAvatarChange}
                    type="text"
                    name="alt"
                    id="avatarAlt"
                    value={formData.avatar.alt}
                    className="block w-full rounded-md border py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="My avatar alt text"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6">
                  Venue Manager
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    name="venueManager"
                    id="venueManager"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 align-middle"
                  />
                  <label htmlFor="venueManager" className="ml-2">
                    I am a venue manager
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="btn-revert text-sm font-semibold leading-6"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="btn" disabled={!isFormValid}>
              {loading ? <p>Loading...</p> : <p>Send</p>}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default RegistrationForm;