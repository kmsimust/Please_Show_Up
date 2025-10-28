import logo from "../../assets/images/logo.png";
import calendar from "../../assets/images/calendar.png";
import event from "../../assets/images/event.png";
import group from "../../assets/images/group.png";

import "./about_us.css";

export function AboutUsPage() {
  return (
    <div
      style={{
        background: "#f5f6ee",
        color: "#1f2b25",
        fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
      }}
    >
      {/* Header / Hero */}
      <header className="main-header">
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "30px",
            display: "flex",
            gap: "12px",
          }}
        >
          <a
            href="/login"
            style={{
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: 600,
              background: "#ffffff",
              color: "#17563f",
              border: "2px solid #ffffff",
              transition: "all 0.25s ease",
            }}
          >
            Login
          </a>
          <a
            href="/signup"
            style={{
              textDecoration: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: 600,
              background: "transparent",
              color: "#ffffff",
              border: "2px solid #ffffff",
              transition: "all 0.25s ease",
            }}
          >
            Sign Up
          </a>
        </div>
        <h1
          style={{
            fontFamily: "Georgia, Times New Roman, serif",
            fontSize: "56px",
            margin: 0,
          }}
        >
          About Us
        </h1>
      </header>

      {/* Main */}
      <main
        style={{ maxWidth: "1100px", margin: "34px auto", padding: "28px" }}
      >
        {/* First section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "36px",
            alignItems: "start",
            marginBottom: "36px",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                color: "#1b6a47",
                fontFamily: "Georgia, serif",
                fontSize: "28px",
                marginBottom: "18px",
                position: "relative",
                paddingBottom: "8px",
                borderBottom: "4px solid #1b6a47",
                borderRadius: "3px",
              }}
            >
              Event Part
            </span>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                margin: "6px 0 14px",
              }}
            >
              How is ‘Please Show Up!’ going to help you?
            </h2>
            <p
              style={{
                color: "#54645a",
                marginBottom: "18px",
                fontSize: "15px",
              }}
            >
              It helps with planning events and group projects — no more lost
              messages or missed attendences.
            </p>
            <div style={{ marginTop: "22px", width: "260px", height: "200px" }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: "12px",
                }}
              >
                <img
                  src={calendar}
                  alt="student writing"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>

          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: "320px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "14px",
              }}
            >
              <img
                src={group}
                alt="event"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                width: "320px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "14px",
              }}
            >
              <img
                src={event}
                alt="event"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </aside>
        </div>

        {/* Second section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "36px",
            marginTop: "18px",
            alignItems: "start",
          }}
        >
          <div>
            <h3
              style={{
                color: "#1b6a47",
                fontFamily: "Georgia, serif",
                fontSize: "22px",
                marginBottom: "10px",
              }}
            >
              Calendar &amp; Social credit
            </h3>
            <p style={{ color: "#54645a", fontSize: "15px" }}>
              Keep your updated calendar to manage your class group work or
              events.
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "20px",
                marginBottom: "8px",
              }}
            >
              Event Part
            </div>
            <ul
              style={{ listStyle: "none", color: "#54645a", fontSize: "15px" }}
            >
              <li
                style={{
                  position: "relative",
                  paddingLeft: "22px",
                  marginBottom: "10px",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    content: '""',
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#1b6a47",
                    position: "absolute",
                    left: "-2px",
                    top: "9px",
                  }}
                />
                Show your schedule and inform friends about event times.
              </li>
              <li
                style={{
                  position: "relative",
                  paddingLeft: "22px",
                  marginBottom: "10px",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    content: '""',
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#1b6a47",
                    position: "absolute",
                    left: "-2px",
                    top: "9px",
                  }}
                />
                Share schedules with teammates so everyone knows the plan.
              </li>
            </ul>
          </div>
        </div>

        {/* Team row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            margin: "46px 0 26px",
            alignItems: "end",
          }}
        >
          {["Adithep", "Phubet", "sandeeee", "tat"].map((name) => (
            <div key={name} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "150px",
                  height: "200px",
                  margin: "0 auto 14px",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={logo}
                  alt={name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  background: "white",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                {name}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{ textAlign: "center", margin: "30px 0 80px", color: "#1b6a47" }}
      >
        <div style={{ fontFamily: "Georgia, serif", fontSize: "36px" }}>
          copy right
        </div>
      </footer>
    </div>
  );
}
