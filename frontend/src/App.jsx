import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [query, setQuery] = useState("software developer");
  const [location, setLocation] = useState("Hyderabad");
  const [maxAge, setMaxAge] = useState(30);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Animation / parallax state
  const [parallaxY, setParallaxY] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // Scroll parallax
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setParallaxY(Math.min(window.scrollY * 0.12, 120));
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 3D hero mouse movement
  const handleHeroPointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width - 0.5) * 2;

    const y =
      ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    setPointer({ x, y });
  };

  const resetHeroPointer = () => {
    setPointer({ x: 0, y: 0 });
  };

  // Submit resume and search real jobs
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setError("Please select your resume PDF or DOCX file.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", resume);

      const params = new URLSearchParams({
        query,
        location,
        max_age_days: maxAge,
      });

      const response = await fetch(
`https://realtime-resume-job-matcher-1.onrender.com/match-jobs?${params.toString()}`,        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data.detail === "string"
            ? data.detail
            : "Something went wrong while matching jobs.";

        throw new Error(message);
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Cannot connect to the backend. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-shell ${loading ? "is-loading" : ""}`}>
      {/* NAVIGATION */}
      <nav className="navbar reveal-down">
        <div className="brand">
          <div className="brand-mark">R</div>

          <div>
            <span className="brand-name">
              RESUMATCH
            </span>

            <span className="brand-sub">
              AI CAREER ENGINE
            </span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#home">HOME</a>
          <a href="#search">FIND JOBS</a>
          <a href="#results">RESULTS</a>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          REAL JOB DATA
        </div>
      </nav>

      {/* HERO */}
      <main id="home">
        <section className="hero-section reveal-visible">
          <div className="hero-grid">

            <div className="hero-copy reveal reveal-delay-1">
              <p className="eyebrow">
                <span></span>
                AI-POWERED JOB DISCOVERY
              </p>

              <h1>
                FIND YOUR
                <br />
                <strong>NEXT ROLE.</strong>
              </h1>

              <p className="hero-description">
                Upload your resume. Discover real opportunities.
                Understand exactly how your skills match each job.
              </p>

              <div className="hero-actions">
                <a
                  href="#search"
                  className="primary-btn magnetic-btn"
                >
                  START SEARCH
                  <span>↗</span>
                </a>

                <div className="hero-stat">
                  <strong>REAL</strong>
                  <span>JOB LISTINGS</span>
                </div>
              </div>
            </div>

            <div
              className="hero-visual parallax-scene"
              onMouseMove={handleHeroPointer}
              onMouseLeave={resetHeroPointer}
              style={{
                "--parallax-y": `${parallaxY}px`,
                "--pointer-x": pointer.x,
                "--pointer-y": pointer.y,
              }}
            >
              <div className="red-panel parallax-back"></div>

              <div className="floating-card main-card three-d-main">
                <div className="card-label">
                  <span>01</span>
                  RESUME ANALYSIS
                </div>

                <div className="scan-line"></div>

                <div className="resume-icon">
                  CV
                </div>

                <h3>YOUR SKILLS.</h3>

                <h3 className="red-text">
                  YOUR OPPORTUNITY.
                </h3>

                <div className="mini-skills">
                  <span>JAVA</span>
                  <span>SQL</span>
                  <span>HTML</span>
                  <span>CSS</span>
                </div>
              </div>

              <div className="floating-card score-card three-d-front">
                <span>EST. MATCH</span>

                <strong>EST.</strong>

                <small>
                  EXPLAINABLE SCORE
                </small>
              </div>

              <div className="visual-number parallax-number">
                01
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <span>REAL-TIME SEARCH</span>
            <span>•</span>
            <span>EXPLAINABLE MATCHING</span>
            <span>•</span>
            <span>DIRECT APPLICATION LINKS</span>
          </div>
        </section>

        {/* SEARCH */}
        <section
          id="search"
          className="search-section reveal-section"
        >
          <div className="section-heading">
            <div>
              <p className="section-number">
                01 / SEARCH
              </p>

              <h2>
                BUILD YOUR
                <br />
                <span>SEARCH.</span>
              </h2>
            </div>

            <p>
              Tell us what you're looking for and upload
              your current resume. The system will compare
              it against real job listings.
            </p>
          </div>

          <form
            className="search-panel"
            onSubmit={handleSubmit}
          >
            <div className="upload-box micro-interaction">
              <div className="upload-number">
                01
              </div>

              <div className="upload-content">
                <span className="field-label">
                  YOUR RESUME
                </span>

                <label
                  htmlFor="resume-upload"
                  className="upload-label upload-dropzone"
                >
                  <div className="upload-icon">
                    ↑
                  </div>

                  <div>
                    <strong>
                      {resume
                        ? resume.name
                        : "UPLOAD PDF OR DOCX"}
                    </strong>

                    <small>
                      {resume
                        ? "Resume selected successfully"
                        : "Drop your resume or click to browse"}
                    </small>
                  </div>
                </label>

                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={(e) => {
                    setResume(
                      e.target.files[0] || null
                    );
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="search-fields">
              <div className="field">
                <label>
                  02 / TARGET ROLE
                </label>

                <input
                  type="text"
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  placeholder="Software Developer"
                />
              </div>

              <div className="field">
                <label>
                  03 / LOCATION
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Hyderabad"
                />
              </div>

              <div className="field">
                <label>
                  04 / JOB AGE
                </label>

                <select
                  value={maxAge}
                  onChange={(e) =>
                    setMaxAge(
                      Number(e.target.value)
                    )
                  }
                >
                  <option value="7">
                    LAST 7 DAYS
                  </option>

                  <option value="14">
                    LAST 14 DAYS
                  </option>

                  <option value="30">
                    LAST 30 DAYS
                  </option>

                  <option value="60">
                    LAST 60 DAYS
                  </option>
                </select>
              </div>

              <button
                type="submit"
                className="search-submit magnetic-btn"
                disabled={loading}
              >
                {loading
                  ? "ANALYZING..."
                  : "FIND JOBS"}

                <span>↗</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="error-box">
              <strong>ERROR</strong>
              <span>{error}</span>
            </div>
          )}
        </section>

        {/* RESULTS */}
        {result && (
          <section
            id="results"
            className="results-section reveal-section"
          >
            <div className="results-heading">
              <div>
                <p className="section-number">
                  02 / RESULTS
                </p>

                <h2>
                  YOUR NEXT
                  <br />
                  <span>OPPORTUNITIES.</span>
                </h2>
              </div>

              <div className="results-meta">
                <div className="result-count">
                  <strong>
                    {result.jobs_found}
                  </strong>

                  <span>
                    JOBS FOUND
                  </span>
                </div>

                <div className="search-summary">
                  <span>{result.query}</span>
                  <span>—</span>
                  <span>{result.location}</span>
                </div>
              </div>
            </div>

            {/* RESUME SKILLS */}
            {result.resume_skills &&
              result.resume_skills.length > 0 && (
                <div className="skills-strip">
                  <div className="skills-title">
                    <span>
                      YOUR PROFILE
                    </span>

                    <strong>
                      DETECTED SKILLS
                    </strong>
                  </div>

                  <div className="profile-skills">
                    {result.resume_skills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="skill-pop"
                          style={{
                            "--skill-delay": `${
                              index * 70
                            }ms`,
                          }}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* JOBS */}
            <div className="jobs-grid">
              {result.jobs &&
              result.jobs.length > 0 ? (
                result.jobs.map(
                  (job, index) => (
                    <JobCard
                      job={job}
                      index={index}
                      key={job.id || index}
                    />
                  )
                )
              ) : (
                <div className="no-jobs">
                  <strong>
                    NO MATCHES FOUND
                  </strong>

                  <span>
                    Try changing the role,
                    location or job age.
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-brand">
            <div className="brand-mark">
              R
            </div>

            <strong>
              RESUMATCH
            </strong>
          </div>

          <p>
            Real resume analysis. Real job
            listings. Explainable matching.
          </p>

          <span>
            © 2026 RESUMATCH
          </span>
        </footer>
      </main>
    </div>
  );
}

/* ============================================================
   JOB CARD
============================================================ */

function JobCard({ job, index }) {
  const matching = job.matching || {};

  const score =
    matching.match_percentage;

  const missingSkills =
    matching.missing_skills || [];

  const matchedSkills =
    matching.matching_skills || [];

  const explanation =
    matching.explanation || "";

  const dataQuality =
    matching.data_quality || "";

  const scoreNote =
    matching.score_note || "";

  const breakdown =
    matching.score_breakdown || {};

  return (
    <article
      className="job-card job-card-reveal micro-interaction"
      style={{
        "--card-delay": `${
          Math.min(index * 90, 540)
        }ms`,
      }}
    >
      <div className="job-number">
        0{index + 1}
      </div>

      <div className="job-header">
        <div className="job-main">
          <p className="job-category">
            {job.category || "IT JOB"}
          </p>

          <h3>
            {job.title || "Software Job"}
          </h3>

          <div className="company-name">
            {job.company ||
              "Company not specified"}
          </div>

          <div className="job-location">
            <span>+</span>
            {job.location ||
              "Location not specified"}
          </div>
        </div>

        <div className="match-box">
          <span>EST. MATCH</span>

          <strong>
            {score !== null &&
            score !== undefined
              ? `${Number(score).toFixed(1)}%`
              : "—"}
          </strong>

          <small>
            BASED ON AVAILABLE DATA
          </small>
        </div>
      </div>

      <div className="job-divider"></div>

      {job.created && (
        <div className="job-posted">
          POSTED{" "}
          {new Date(
            job.created
          ).toLocaleDateString()}
        </div>
      )}

      {job.description && (
        <p className="job-description">
          {job.description}
        </p>
      )}

      {explanation && (
        <div className="analysis-block">
          <div className="analysis-title">
            <span>02</span>
            WHY THIS MATCH?
          </div>

          <p>
            {explanation}
          </p>
        </div>
      )}

      {matchedSkills.length > 0 && (
        <div className="skill-analysis">
          <div className="analysis-title">
            <span>03</span>
            MATCHING SKILLS
          </div>

          <div className="job-skills">
            {matchedSkills.map(
              (skill, i) => (
                <span
                  className="matched-skill"
                  key={i}
                >
                  ✓ {skill}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {missingSkills.length > 0 && (
        <div className="skill-analysis missing-analysis">
          <div className="analysis-title">
            <span>04</span>
            SKILLS TO DEVELOP
          </div>

          <div className="job-skills">
            {missingSkills.map(
              (skill, i) => (
                <span
                  className="missing-skill"
                  key={i}
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      )}

      {dataQuality && (
        <div className="quality-line">
          <span>
            JOB DATA QUALITY
          </span>

          <strong>
            {dataQuality}
          </strong>
        </div>
      )}

      {Object.keys(breakdown).length > 0 && (
        <details className="score-details">
          <summary>
            VIEW MATCH SCORE DETAILS
            <span>+</span>
          </summary>

          <div className="score-breakdown">
            {breakdown.skill_score !==
              undefined && (
              <div>
                <span>
                  SKILL SCORE
                </span>

                <strong>
                  {breakdown.skill_score}
                </strong>
              </div>
            )}

            {breakdown.title_relevance_score !==
              undefined && (
              <div>
                <span>
                  TITLE RELEVANCE
                </span>

                <strong>
                  {
                    breakdown.title_relevance_score
                  }
                </strong>
              </div>
            )}

            {breakdown.semantic_similarity_percentage !==
              undefined && (
              <div>
                <span>
                  SEMANTIC SIMILARITY
                </span>

                <strong>
                  {
                    breakdown.semantic_similarity_percentage
                  }
                  %
                </strong>
              </div>
            )}

            {breakdown.resume_job_evidence_score !==
              undefined && (
              <div>
                <span>
                  RESUME/JOB EVIDENCE
                </span>

                <strong>
                  {
                    breakdown.resume_job_evidence_score
                  }
                </strong>
              </div>
            )}

            {breakdown.total_score !==
              undefined && (
              <div>
                <span>
                  TOTAL SCORE
                </span>

                <strong>
                  {breakdown.total_score}
                </strong>
              </div>
            )}
          </div>
        </details>
      )}

      {scoreNote && (
        <p className="score-note">
          {scoreNote}
        </p>
      )}

      <p className="score-note">
        Match score is an estimate based on
        the resume and job information
        available from the job source. It is
        not a hiring prediction.
      </p>

      <div className="job-footer">
        <span className="source-label">
          SOURCE / {job.source || "ADZUNA"}
        </span>

        {job.apply_url && (
          <a
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="apply-button magnetic-btn"
          >
            VIEW & APPLY
            <span>↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default App;