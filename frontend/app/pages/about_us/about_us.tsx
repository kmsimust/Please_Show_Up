import React from "react";
import logo from "../../assets/images/logo.png";
import calendar from "../../assets/images/calendar.png";
import event from "../../assets/images/event.png";
import group from "../../assets/images/group.png";
import { UnAuthNavBar } from "../../components/unauth_navbar";

import "./about_us.css";

export function AboutUsPage() {
    const members = [
        { name: "Jirakorn", file: "sandee" },
        { name: "Phubet", file: "chuan" },
        { name: "Adithep", file: "adithep" },
        { name: "Tat", file: "sandee" },
    ];

    // Use root public path - React serves public/ at /
    // Default to .jpg since your images are JPG
    const buildSrc = (fileBase: string) => `/${fileBase}.jpg`;

    return (
        <div className="about-page-root">
            <UnAuthNavBar />

            <header className="hero">
                <div className="hero-inner">
                    <div className="hero-text">
                        <h1 className="hero-title">About Us</h1>
                        <p className="hero-sub">
                            “Please Show Up!” helps groups and teams find the
                            best time to meet, track attendance, and build trust
                            with social credit and attendance history.
                        </p>
                        <a
                            className="hero-cta"
                            href="/signup"
                            aria-label="Sign up"
                        >
                            Get started — it's free
                        </a>
                    </div>

                    <div className="hero-media" aria-hidden="true">
                        <img
                            src={logo}
                            alt="Project logo"
                            className="hero-logo"
                        />
                    </div>
                </div>
            </header>

            <main className="container">
                <section className="feature-row">
                    <div className="feature-text">
                        <h2 className="section-title">Event Part</h2>
                        <h3 className="section-subtitle">
                            How is ‘Please Show Up!’ going to help you?
                        </h3>
                        <p className="muted">
                            It helps with planning events and group projects —
                            no more lost messages or missed attendances. Create
                            appointment tables, vote on availability, and let
                            leaders track attendance and share a group diary
                            when events finish.
                        </p>

                        <div className="small-media-grid">
                            <div className="media-card">
                                <img src={calendar} alt="calendar preview" />
                            </div>
                        </div>
                    </div>

                    <aside className="feature-aside">
                        <div className="media-card tall">
                            <img src={group} alt="group preview" />
                        </div>
                        <div className="media-card tall">
                            <img src={event} alt="event preview" />
                        </div>
                    </aside>
                </section>

                <section className="two-col">
                    <div>
                        <h3 className="green-heading">
                            Calendar &amp; Social credit
                        </h3>
                        <p className="muted">
                            Keep an up-to-date calendar to manage your class
                            group work or events. Track attendance history and
                            encourage responsibility with our social credit
                            point system.
                        </p>
                    </div>

                    <div className="right">
                        <div className="small-title">Event Part</div>
                        <ul className="feature-list">
                            <li>
                                Show your schedule and inform friends about
                                event times.
                            </li>
                            <li>
                                Share schedules with teammates so everyone knows
                                the plan.
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="team-section">
                    <h3 className="section-title center">Meet the team</h3>

                    <div className="team-grid" role="list">
                        {members.map((m) => (
                            <div
                                key={m.name}
                                className="member-card"
                                role="listitem"
                            >
                                <div className="member-photo-wrap">
                                    <img
                                        src={buildSrc(m.file)}
                                        alt={m.name}
                                        className="member-photo"
                                        onError={(
                                            e: React.SyntheticEvent<HTMLImageElement>,
                                        ) => {
                                            const img = e.currentTarget;
                                            // fallback to .png if .jpg not found
                                            if (!img.dataset.fallbackTried) {
                                                img.dataset.fallbackTried =
                                                    "true";
                                                img.src = `/${m.file}.png`;
                                            }
                                        }}
                                    />
                                </div>
                                <div className="member-name">{m.name}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <footer className="site-footer">
                <div className="footer-brand">
                    © {new Date().getFullYear()} Please Show Up!
                </div>
            </footer>
        </div>
    );
}
