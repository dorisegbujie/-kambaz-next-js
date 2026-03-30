"use client";
import { useEffect, useState } from "react";
import { fetchWelcomeMessage } from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("Welcome");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("Welcome");

  const fetchWelcomeOnClick = async () => {
    const data = await fetchWelcomeMessage();
    setWelcomeOnClick(data);
  };

  useEffect(() => {
    const fetchWelcomeOnLoad = async () => {
      const data = await fetchWelcomeMessage();
      setWelcomeOnLoad(data);
    };
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div id="wd-http-client">
      <h2>HTTP Client</h2>
      <h3>Requesting on Click</h3>
      <h4 id="wd-on-click-message">{welcomeOnClick}</h4>
      <button
        id="wd-fetch-welcome-message"
        onClick={fetchWelcomeOnClick}
        className="btn btn-primary"
      >
        Fetch Welcome Message
      </button>
      <hr />
      <h3>Requesting on Load</h3>
      <h4 id="wd-on-load-message">{welcomeOnLoad}</h4>
      <hr />
    </div>
  );
}
