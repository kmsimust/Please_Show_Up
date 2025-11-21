// app/pages/create_event/create_event.tsx
import "./create_group.css";
import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import type { EventCreate } from "~/types/event";
import { create_event } from "~/services/event";

export function CreateEvent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(""); // 👈 'YYYY-MM-DD'

  const group_id = Number(searchParams.get("group_id"));

  useEffect(() => {
    page_load();
  }, []);

  async function page_load() {
    setIsLoading(true);
    setError(null);
    setIsLoading(false);
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!group_id || Number.isNaN(group_id)) {
      setError("Invalid group id.");
      return;
    }

    if (!startDate) {
      setError("Please select a start date.");
      return;
    }

    // 👇 This will be { name, description, start_date: '2025-11-24', group: 25 }
    const body: EventCreate = {
      name,
      description,
      start_date: startDate, // already 'YYYY-MM-DD'
      group: group_id,
    };

    const { result, error } = await create_event(body);

    if (error) {
      if (typeof error === "string") {
        setError(error);
      } else if (error?.message) {
        setError(error.message);
      } else {
        setError("Failed to create event.");
      }
      return;
    }

    navigate(`/in_group?group_id=${group_id}`);
  };

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="main-content">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="content-area">
          <div className="create-group-form">
            <h2>Create Event</h2>

            {error && <div className="error mb-3">{error}</div>}

            <form onSubmit={handleCreateEvent}>
              {/* Event Name */}
              <div className="form-group">
                <label htmlFor="event_name">Event Name *</label>
                <input
                  type="text"
                  id="event_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter event name"
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your event"
                />
              </div>

              {/* Start Date (DATE ONLY) */}
              <div className="form-group">
                <label htmlFor="start_date">Start Date *</label>
                <input
                  type="date"
                  id="start_date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)} // 'YYYY-MM-DD'
                  required
                />
              </div>

              {/* Submit */}
              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  Create Event
                </button>
              </div>
            </form>
          </div>
          {/* end card */}
        </div>
      </div>
    </div>
  );
}
