import React, { useState } from "react";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const uploader = Uploader({
    apiKey: "public_kW15bTXEHVT6mneVaQLLzRw8FBoZ",
  });

  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [isArtist, setIsArtist] = useState(false);
  const [bio, setBio] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

  const [uploadText, setUploadText] = useState("Upload a profile picture...");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isArtist) {
      const accountDetails = {
        name,
        phone,
        email,
        password,
        bio,
        profilePictureURL,
      };

      axios
        .post("http://localhost:4000/api/createArtist", accountDetails)
        .then((res) => {
          if (res.data.status === "ok") {
            alert("ARTIST CREATED");
          } else {
            alert(res.data.message);
          }
        });
    } else {
      const accountDetails = {
        name,
        phone,
        email,
        password,
      };

      axios
        .post("http://localhost:4000/api/createUser", accountDetails)
        .then((res) => {
          if (res.data.status === "ok") {
            alert("USER CREATED");
          } else {
            alert(res.data.message);
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900">
            Art <span className="text-6xl font-bold text-blue-600">Space</span>
          </h1>
          <h2 className="mt-10 text-xl font-bold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-md -space-y-px">
            <input
              name="name"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
              placeholder="Full Name"
            />
            <input
              name="phone"
              type="tel"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
              placeholder="Phone Number"
            />
            <input
              name="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
              placeholder="Email address"
            />
            <input
              name="password"
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
              placeholder="Password"
            />
          </div>

          <div className="mt-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={isArtist}
                onChange={() => setIsArtist(!isArtist)}
              />
              <span className="ml-2 text-lg">Are you an artist?</span>
            </label>
          </div>

          {isArtist && (
            <div className="mt-4">
              <textarea
                name="biography"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                rows="4"
                placeholder="Biography"
              ></textarea>
              <UploadButton
                uploader={uploader}
                options={{ multi: false }}
                onComplete={(files) => {
                  if (files[0]) {
                    setProfilePictureURL(files[0].fileUrl);
                    setUploadText("Uploaded!");
                  }
                }}
                className="mt-3"
              >
                {({ onClick, onDragOver, onDragLeave, onDrop }) => (
                  <button
                    onClick={onClick}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
                  >
                    {uploadText}
                  </button>
                )}
              </UploadButton>
            </div>
          )}

          <div className="flex justify-center">
            <div className="text-lg">
              <p className="font-medium text-gray-900">
                Already have an account?{" "}
                <span
                  onClick={() => {
                    navigate("/");
                  }}
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
