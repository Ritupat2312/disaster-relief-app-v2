// File: src/pages/OfferHelp.jsx
import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, Timestamp } from "firebase/firestore";

function OfferHelp() {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claimStatus, setClaimStatus] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Ensure collection name matches Dashboard.js → "helpRequests"
    const q = query(collection(db, "helpRequests"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const requests = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((req) => req.status !== "claimed" && req.status !== "resolved");
        setHelpRequests(requests);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching helpRequests:", err);
        setError("Failed to load help requests. Check Firebase config & network.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleClaimRequest = async (requestId) => {
    setClaimStatus((prev) => ({ ...prev, [requestId]: "claiming" }));
    try {
      const requestRef = doc(db, "helpRequests", requestId);
      await updateDoc(requestRef, {
        status: "claimed",
        claimedBy: "Volunteer User", // Replace with logged-in user name
        claimedAt: Timestamp.now(),
      });
      setClaimStatus((prev) => ({ ...prev, [requestId]: "claimed" }));
      alert("Request claimed successfully! Please contact the requester.");
    } catch (err) {
      console.error("Error claiming request:", err);
      setClaimStatus((prev) => ({ ...prev, [requestId]: "error" }));
      alert("Failed to claim request. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-blue-600">
        <svg
          className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-lg font-semibold">Loading available help requests...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 font-bold bg-red-100 border border-red-300 rounded-lg max-w-xl mx-auto mt-8">
        <p className="text-xl mb-2">Error: Something went wrong!</p>
        <p className="text-base">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-8 border-t-4 border-blue-500">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Available Help Requests</h2>
      {helpRequests.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-lg text-gray-600">No help requests right now. Check back later.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {helpRequests.map((req) => (
            <div
              key={req.id}
              className="bg-blue-50 shadow-md rounded-lg p-6 border border-blue-200 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-blue-800">{req.type} Request</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {req.createdAt?.seconds
                    ? new Date(req.createdAt.seconds * 1000).toLocaleString()
                    : "No Date"}
                </span>
              </div>
              <p className="text-gray-700 mb-1">
                <strong>Requested by:</strong> {req.name}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Location:</strong> {req.location}
              </p>
              <p className="text-gray-700 mb-3 italic">
                <strong>Details:</strong> "{req.message}"
              </p>
              {req.status === "claimed" ? (
                <p className="mt-2 text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-md">
                  Claimed by {req.claimedBy}
                </p>
              ) : (
                <button
                  onClick={() => handleClaimRequest(req.id)}
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-semibold transition disabled:opacity-50"
                  disabled={claimStatus[req.id] === "claiming"}
                >
                  {claimStatus[req.id] === "claiming" ? "Claiming..." : "Offer Help for this Request"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OfferHelp;
