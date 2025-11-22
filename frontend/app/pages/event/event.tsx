import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import { get_event_by_group_id } from "~/services/event"; // you'll implement this
import "./event.css"; // 👈 add this

export function EventPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [event, setEvent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const event_id = Number(searchParams.get("event_id")); // 👈 from query string
  // fetch event by ID...

  useEffect(() => {
    async function loadEvent() {
      try {
        const { result, error } = await get_event_by_group_id(Number(event_id));
        if (error) {
          setError(error);
        } else {
          setEvent(result);
        }
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setIsLoading(false);
      }
    }
    loadEvent();
  }, [event_id]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-container">
      <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="content-area">
          <div className="event-wrapper">
            <div className="event-header">
              <h1 className="event-title">
                {/* You can replace this with event?.name later */}
                Event Name
              </h1>
              <p className="event-subtitle">
                Description: egjgbewujfioewnfioqewnfioeion
              </p>
            </div>

            <div className="event-calendar">
              {/* Header row */}
              <div className="ec-header-row">
                <div className="ec-cell ec-header-cell ec-name-header">Member</div>
                <div className="ec-cell ec-header-cell">Mon</div>
                <div className="ec-cell ec-header-cell">Tue</div>
                <div className="ec-cell ec-header-cell">Wed</div>
                <div className="ec-cell ec-header-cell">Thu</div>
                <div className="ec-cell ec-header-cell">Fri</div>
                <div className="ec-cell ec-header-cell">Sat</div>
                <div className="ec-cell ec-header-cell">Sun</div>
              </div>

              {/* Row 1 */}
              <div className="ec-row">
                <div className="ec-cell ec-name-cell">Alice</div>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
              </div>

              {/* Row 2 */}
              <div className="ec-row">
                <div className="ec-cell ec-name-cell">Bob</div>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
              </div>

              {/* Row 3 */}
              <div className="ec-row">
                <div className="ec-cell ec-name-cell">Charlie</div>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
                <button type="button" className="ec-cell ec-slot">-</button>
              </div>

              {/* Add more rows later via TS if you want */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
