import React, { useEffect } from 'react';
import ProjectDashboard from '../components/ProjectDashboard';

const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '4rem 0',
        textAlign: 'center',
        borderBottom: '4px solid #f97316'
      }}>
        <div className="container">
          <span className="section-subtitle">Real-Time Portfolio</span>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '0.75rem' }}>
            Construction Projects & Status Dashboard
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Track real-time progress, finished handovers, and upcoming developments by GUNA CONSTRUCTION.
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <ProjectDashboard title="All Projects Status & Progress Tracking" />
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
