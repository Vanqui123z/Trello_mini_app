import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectPlanningModal = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [comment, setComment] = useState('');

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-dark text-light border-0" style={{ backgroundColor: '#2c3e50' }}>
          {/* Header */}
          <div className="modal-header border-0 pb-2">
            <div className="d-flex align-items-center">
              <span className="badge bg-secondary me-2" style={{ backgroundColor: '#34495e' }}>
                <i className="bi bi-kanban"></i> Project planning
              </span>
              <button type="button" className="btn-close btn-close-white ms-auto" aria-label="Close"></button>
            </div>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Status and Notifications */}
            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center mb-2">
                  <span className="text-muted small me-2">Status</span>
                  <span className="badge bg-warning text-dark rounded-pill px-2 py-1">
                    <small>⚠️</small>
                  </span>
                </div>
                <div className="mb-2">
                  <small className="text-muted">Notifications</small>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-secondary me-2 px-2 py-1" style={{ backgroundColor: '#34495e' }}>
                      <i className="bi bi-bell"></i> Watch
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="col-6">
                <div className="text-end">
                  <small className="text-muted">Add to card</small>
                  <div className="mt-1">
                    <button className="btn btn-sm btn-outline-secondary me-1 mb-1">
                      <i className="bi bi-people"></i> Members
                    </button>
                  </div>
                  <div className="small text-muted mb-1">Power-Ups</div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-1 mb-1">
                      <i className="bi bi-github"></i> GitHub
                    </button>
                  </div>
                  <div className="small text-muted mb-1">Attach Branch</div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-1 mb-1">
                      <i className="bi bi-git"></i> Azure DevOps
                    </button>
                  </div>
                  <div className="small text-muted mb-1">Actions</div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-1 mb-1">
                      <i className="bi bi-arrow-right"></i> Move
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-1 mb-1">
                      <i className="bi bi-files"></i> Copy
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-1 mb-1">
                      <i className="bi bi-archive"></i> Archive
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-text-left me-2"></i>
                <h6 className="mb-0">Description</h6>
              </div>
              <div className="form-control bg-secondary text-light border-0" style={{ backgroundColor: '#34495e', minHeight: '60px' }}>
                <small className="text-muted">Add a more detailed description...</small>
              </div>
            </div>

            {/* Activity */}
            <div className="mb-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-activity me-2"></i>
                  <h6 className="mb-0">Activity</h6>
                </div>
                <div>
                  <button 
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? 'Hide details' : 'Show details'}
                  </button>
                </div>
              </div>

              {/* Comment Input */}
              <div className="d-flex align-items-start">
                <div className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-3" 
                     style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                  <span className="text-dark">👤</span>
                </div>
                <div className="flex-grow-1">
                  <textarea 
                    className="form-control bg-secondary text-light border-0" 
                    style={{ backgroundColor: '#34495e' }}
                    placeholder="Write a comment..."
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="mt-2">
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-archive"></i> Archive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-dark {
          background-color: #2c3e50 !important;
        }
        .btn-outline-secondary {
          border-color: #6c757d;
          color: #6c757d;
        }
        .btn-outline-secondary:hover {
          background-color: #6c757d;
          border-color: #6c757d;
          color: white;
        }
        .form-control {
          background-color: #34495e !important;
          border: none !important;
          color: white !important;
        }
        .form-control::placeholder {
          color: #adb5bd !important;
        }
        .badge {
          font-size: 0.75em;
        }
        .modal-content {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default ProjectPlanningModal;