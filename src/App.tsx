import { useMemo, useState } from 'react';
import { jobs } from './data/jobs';

const jobTypeOptions = ['All', 'Remote', 'Freelance', 'Contract', 'Part-time'];
const experienceOptions = ['All', 'Entry', 'Mid', 'Senior'];
const categoryOptions = ['All', 'AI Training', 'Translation', 'Content', 'Data Annotation', 'Quality Review'];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [turkeyOnly, setTurkeyOnly] = useState(false);

  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesSearch =
        query.length === 0 ||
        [job.title, job.company, job.category, job.languageRequirements, job.eligibility]
          .join(' ')
          .toLowerCase()
          .includes(query);

      const matchesType = selectedType === 'All' || job.jobType === selectedType;
      const matchesExperience =
        selectedExperience === 'All' || job.experience === selectedExperience;
      const matchesCategory =
        selectedCategory === 'All' || job.category === selectedCategory;
      const matchesTurkey = !turkeyOnly || job.isTurkeyEligible;

      return matchesSearch && matchesType && matchesExperience && matchesCategory && matchesTurkey;
    });
  }, [searchTerm, selectedType, selectedExperience, selectedCategory, turkeyOnly]);

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <span className="brand-kicker">Turkish Remote Jobs</span>
          <strong>Remote work discovery</strong>
        </div>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#jobs">Jobs</a>
          <a href="#transparency">Transparency</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Sample MVP</span>
            <h1>Find remote work opportunities that fit Turkish-speaking job seekers.</h1>
            <p>
              This project is built to help people living in Turkey and Turkish-speaking talent
              worldwide discover flexible online roles in AI, content, translation, and data work.
            </p>
            <div className="cta-row">
              <a href="#jobs" className="primary-button">
                Browse jobs
              </a>
              <a href="#about" className="secondary-button">
                Learn more
              </a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Project highlights">
            <div className="stat-card">
              <span>Sample listings</span>
              <strong>{jobs.length}</strong>
            </div>
            <div className="stat-card">
              <span>Turkey eligible</span>
              <strong>{jobs.filter((job) => job.isTurkeyEligible).length}</strong>
            </div>
            <div className="stat-card">
              <span>Referral labels</span>
              <strong>Included</strong>
            </div>
          </div>
        </section>

        <section className="notice-banner">
          <strong>Development note:</strong> All job postings below are clearly labeled sample data
          for design and testing only. They are not verified job listings.
        </section>

        <section id="about" className="feature-grid">
          <article className="feature-card">
            <h2>Search and filter</h2>
            <p>Quickly narrow work based on category, experience level, and Turkey eligibility.</p>
          </article>
          <article className="feature-card">
            <h2>Clear eligibility info</h2>
            <p>Applicants can see at a glance whether a role may be open to people in Turkey.</p>
          </article>
          <article className="feature-card">
            <h2>Transparent referrals</h2>
            <p>Referral links are intentionally labeled so users know when a listing includes them.</p>
          </article>
        </section>

        <section id="jobs" className="job-board">
          <div className="board-header">
            <div>
              <span className="eyebrow">Job board</span>
              <h2>Remote listings</h2>
            </div>
            <label className="toggle-row">
              <input
                type="checkbox"
                checked={turkeyOnly}
                onChange={(event) => setTurkeyOnly(event.target.checked)}
              />
              Turkey eligible only
            </label>
          </div>

          <div className="filter-bar" aria-label="Search and filter job listings">
            <label className="search-field">
              <span>Search</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search roles, skills, company, language..."
              />
            </label>

            <label className="select-field">
              <span>Category</span>
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="select-field">
              <span>Type</span>
              <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
                {jobTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="select-field">
              <span>Experience</span>
              <select
                value={selectedExperience}
                onChange={(event) => setSelectedExperience(event.target.value)}
              >
                {experienceOptions.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="job-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <article key={job.id} className="job-card">
                  <div className="job-header-row">
                    <div>
                      <p className="company-name">{job.company}</p>
                      <h3>{job.title}</h3>
                    </div>
                    <span
                      className={`status-pill ${job.isTurkeyEligible ? 'eligible' : 'not-eligible'}`}
                    >
                      {job.isTurkeyEligible ? 'Turkey eligible' : 'Turkey check needed'}
                    </span>
                  </div>

                  <div className="tag-row">
                    <span>{job.category}</span>
                    <span>{job.jobType}</span>
                    <span>{job.experience}</span>
                  </div>

                  <dl className="info-list">
                    <div>
                      <dt>Compensation</dt>
                      <dd>{job.compensation}</dd>
                    </div>
                    <div>
                      <dt>Language</dt>
                      <dd>{job.languageRequirements}</dd>
                    </div>
                    <div>
                      <dt>Eligibility</dt>
                      <dd>{job.eligibility}</dd>
                    </div>
                    <div>
                      <dt>Turkey note</dt>
                      <dd>{job.turkeyNote}</dd>
                    </div>
                  </dl>

                  <p className="job-description">{job.description}</p>

                  <div className="referral-box">
                    <strong>{job.referral}</strong>
                    <span>{job.referralNote}</span>
                  </div>

                  <a
                    href={job.applicationUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="apply-button"
                  >
                    View application
                  </a>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <h3>No matching jobs yet</h3>
                <p>Try removing one of the filters or searching for a broader keyword.</p>
              </div>
            )}
          </div>
        </section>

        <section id="transparency" className="transparency-box">
          <h2>Referral transparency</h2>
          <p>
            This MVP is designed to show referral labels clearly. When a listing includes a referral
            link, the user sees it immediately instead of being misled by a generic application link.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
