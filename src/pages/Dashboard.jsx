import React, { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const Dashboard = () => {
    const [requests, setRequests] = useState([]);
    const [offers, setOffers] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        // Firebase real-time listeners for all collections
        const unsubReq = onSnapshot(
            query(collection(db, "helpRequests"), orderBy("createdAt", "desc")),
            (snapshot) => setRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        );

        const unsubOff = onSnapshot(
            query(collection(db, "helpOffers"), orderBy("createdAt", "desc")),
            (snapshot) => setOffers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        );

        const unsubAlerts = onSnapshot(
            query(collection(db, "disasterAlerts"), orderBy("createdAt", "desc")),
            (snapshot) => setAlerts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        );

        // Cleanup function to detach listeners when the component unmounts
        return () => {
            unsubReq();
            unsubOff();
            unsubAlerts();
        };
    }, []);

    const mapContainerStyle = { width: "100%", height: "400px" };
    const defaultCenter = { lat: 20.5937, lng: 78.9629 };

    const parseLocation = (loc) => {
        if (!loc) return null;
        const [lat, lng] = loc.split(",").map((n) => parseFloat(n.trim()));
        if (isNaN(lat) || isNaN(lng)) return null;
        return { lat, lng };
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Live Disaster Alerts */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">⚠ Live Disaster Alerts</h2>
                {alerts.length === 0 ? (
                    <p className="bg-green-100 text-green-800 p-3 rounded">No active alerts</p>
                ) : (
                    <ul className="bg-red-100 p-3 rounded space-y-1">
                        {alerts.map((a) => (
                            <li key={a.id} className="text-red-800">
                                {a.alert} — {a.location}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Google Map */}
            <div className="mb-6">
                {/* The map key is now correctly accessed as a frontend variable */}
                <LoadScript googleMapsApiKey={process.env.REACT_APP_Maps_API_KEY}>
                    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={5} center={defaultCenter}>
                        {requests.map((req) => {
                            const loc = parseLocation(req.location);
                            return loc ? (
                                <Marker
                                    key={req.id}
                                    position={loc}
                                    icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                                    onClick={() => setSelected({ ...req, type: "request" })}
                                />
                            ) : null;
                        })}

                        {offers.map((offer) => {
                            const loc = parseLocation(offer.location);
                            return loc ? (
                                <Marker
                                    key={offer.id}
                                    position={loc}
                                    icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                                    onClick={() => setSelected({ ...offer, type: "offer" })}
                                />
                            ) : null;
                        })}

                        {selected && (
                            <InfoWindow
                                position={parseLocation(selected.location)}
                                onCloseClick={() => setSelected(null)}
                            >
                                <div>
                                    <h2 className="font-bold">{selected.name}</h2>
                                    <p>{selected.contact}</p>
                                    {selected.type === "request" ? (
                                        <p className="text-red-600">Needs: {selected.type}</p>
                                    ) : (
                                        <p className="text-green-600">Offers: {selected.skill}</p>
                                    )}
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>

            {/* Table View */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-3">Help Requests</h2>
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Contact</th>
                                <th className="p-3 border">Type</th>
                                <th className="p-3 border">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => (
                                <tr key={req.id}>
                                    <td className="p-3 border">{req.name}</td>
                                    <td className="p-3 border">{req.contact}</td>
                                    <td className="p-3 border">{req.type}</td>
                                    <td className="p-3 border">{req.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-3">Help Offers</h2>
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Contact</th>
                                <th className="p-3 border">Skill</th>
                                <th className="p-3 border">Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map((offer) => (
                                <tr key={offer.id}>
                                    <td className="p-3 border">{offer.name}</td>
                                    <td className="p-3 border">{offer.contact}</td>
                                    <td className="p-3 border">{offer.skill}</td>
                                    <td className="p-3 border">{offer.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;