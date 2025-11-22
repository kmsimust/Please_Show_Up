import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import { get_event_by_group_id } from "~/services/event"; // you'll implement this

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
          
        </div>
      </div>
    </div>
  );
}
