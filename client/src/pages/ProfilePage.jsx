"use client";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { User, Upload } from "lucide-react";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-5/6 max-w-4xl bg-gray-900/70 backdrop-blur-xl text-gray-300 border-2 border-gray-700/50 flex items-center justify-between max-sm:flex-col-reverse rounded-2xl shadow-2xl z-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            {selectedImg ? (
              <img
                src={URL.createObjectURL(selectedImg) || "/placeholder.svg"}
                alt=""
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
            )}
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload profile image
            </div>
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-800/50 text-white"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-gray-800/50 text-white"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>
        {authUser?.profilePic ? (
          <img
            className="w-44 h-44 rounded-full object-cover mx-10 max-sm:mt-10 border-4 border-violet-500/30"
            src={authUser.profilePic || "/placeholder.svg"}
            alt=""
          />
        ) : (
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-10 max-sm:mt-10 border-4 border-violet-500/30">
            <User className="w-24 h-24 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
