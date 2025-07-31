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
    const q = query(collection(db, "help_requests"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requests = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).filter(request => request.status !== 'claimed' && request.status !== 'resolved');
      setHelpRequests(requests);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching help requests in real-time:", err);
      setError("Failed to load help requests. Please ensure Firebase is correctly configured and you have network access.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClaimRequest = async (requestId) => {
    setClaimStatus(prev => ({ ...prev, [requestId]: 'claiming' }));
    try {
      const requestRef = doc(db, "help_requests", requestId);
      await updateDoc(requestRef, {
        status: 'claimed',
        claimedBy: 'Volunteer Name (Replace with actual user ID/name)', 
        claimedAt: Timestamp.now()
      });
      setClaimStatus(prev => ({ ...prev, [requestId]: 'claimed' }));
      alert('Request claimed successfully! Please contact the requester.');
    } catch (err) {
      console.error("Error claiming request:", err);
      setClaimStatus(prev => ({ ...prev, [requestId]: 'error' }));
      alert('Failed to claim request. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-blue-600">
        <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
        <p className="text-sm mt-4">Please check your internet connection or Firebase configuration.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl mt-8 border-t-4 border-teal-500">
      <h2 className="text-3xl font-bold mb-6 text-center text-teal-800">Available Help Requests</h2>
      {helpRequests.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-lg text-gray-600 font-medium">No help requests available at the moment. Check back soon!</p>
          <p className="text-sm text-gray-500 mt-2">Be the first to offer help by submitting a request yourself, or wait for others to post.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {helpRequests.map(request => (
            <div key={request.id} className="bg-blue-50 shadow-md rounded-lg p-6 border border-blue-200 transition-transform transform hover:scale-[1.01] hover:shadow-lg duration-200 animate-fade-in">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-blue-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {request.type} Request
                </h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{new Date(request.createdAt.seconds * 1000).toLocaleString()}</span>
              </div>
              <p className="text-gray-700 mb-2">
                <strong className="font-semibold text-gray-800">Requested by:</strong> {request.name}
              </p>
              <p className="text-gray-700 mb-2">
                <strong className="font-semibold text-gray-800">Location:</strong> {request.location}
              </p>
              <p className="text-gray-700 mb-4 italic">
                <strong className="font-semibold text-gray-800">Details:</strong> "{request.message}"
              </p>
              {request.status === 'claimed' && request.claimedBy ? (
                <p className="mt-2 text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-md">
                  Claimed by {request.claimedBy}
                </p>
              ) : request.status === 'resolved' ? (
                 <p className="mt-2 text-gray-700 font-semibold bg-gray-100 px-3 py-1 rounded-md">
                   Resolved
                 </p>
              ) : (
                <button
                  onClick={() => handleClaimRequest(request.id)}
                  className="mt-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md font-semibold transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  disabled={claimStatus[request.id] === 'claiming'}
                >
                  {claimStatus[request.id] === 'claiming' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Claiming...</span>
                    </>
                  ) : (
                    'Offer Help for this Request'
                  )}
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