import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AuthNavBar } from "../../components/auth_navbar";
import Sidebar from "../../components/sidebar";
import { get_event_info } from "~/services/event";
import { get_group_member } from "~/services/group_member";
import { showPicture } from "~/utils/text-util";
import type { Event } from "~/types/event";
import type { GroupMember } from "~/types/group_member";

import "./event.css";

export function EventPage() {
  const BACKEND_PUBLIC_URL = "http://localhost:8000/public";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const event_id = Number(searchParams.get("event_id"));

  useEffect(() => {
    async function loadEventData() {
      try {
        setIsLoading(true);

        // Fetch event info
        const { result: eventData, error: eventError } = await get_event_info(event_id);
        if (eventError) {
          setError(eventError);
          return;
        }
        setEvent(eventData);

        // Fetch group members
        if (eventData?.group?.id) {
          const { result: members, error: membersError } = await get_group_member(eventData.group.id);
          if (membersError) {
            console.error("Failed to load group members:", membersError);
          } else {
            setGroupMembers(members || []);
          }
        }
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setIsLoading(false);
      }
    }

    if (event_id) {
      loadEventData();
    }
  }, [event_id]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div className="error">Event not found</div>;

  return (
    <div className="page-container">
      <AuthNavBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="main-content">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="content-area event-content-area">
          <div className="event-wrapper">

            <div className="event-header">
              <h1 className="event-title">{event.name || "Event Name"}</h1>
              <p className="event-subtitle">
                Description: {event.description || "No description"}
              </p>
              <p className="event-subtitle">
                Date: {event.start_date?.toString()} to {event.end_date?.toString()}
              </p>
            </div>

            <div className="event-calendar">
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

              {/* Group Owner Row */}
              {event.group?.owner && (
                <div className="ec-row">
                  <div className="ec-cell ec-name-cell">
                    <img
                      src={BACKEND_PUBLIC_URL + showPicture(event.group.owner.profile_image, "default", "/default_user.png")}
                      alt={event.group.owner.username}
                      className="pic-fit"
                      style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }}
                    />
                    {event.group.owner.username} (owner)
                  </div>

                  {Array(7).fill(0).map((_, i) => (
                    <button
                      key={i}
                      className="ec-cell ec-slot"
                      data-state="none"
                    >
                      ?
                    </button>
                  ))}
                </div>
              )}

              {/* Group Members Rows */}
              {groupMembers.map((memberObj) => (
                <div className="ec-row" key={memberObj.id}>
                  <div className="ec-cell ec-name-cell">
                    <img
                      src={BACKEND_PUBLIC_URL + showPicture(memberObj.member?.profile_image, "default", "/default_user.png")}
                      alt={memberObj.member?.username}
                      className="pic-fit"
                      style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px' }}
                    />
                    {memberObj.member?.username}
                  </div>

                  {Array(7).fill(0).map((_, i) => (
                    <button
                      key={i}
                      className="ec-cell ec-slot"
                      data-state="none"
                    >
                      ?
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
