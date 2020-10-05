import React, { useContext } from 'react';
import { object, func, arrayOf, string, bool } from 'prop-types';

import Submission from './submission';
import ProjectSubmissionContext from '../ProjectSubmissionContext';

const noop = () => {};

const SubmissionsList = ({ submissions, handleDelete, onFlag, handleUpdate, isDashboardView }) => {
  const { allSubmissionsPath, legacySubmissionsUrl } = useContext(ProjectSubmissionContext);
  const hasSubmissions = submissions.length > 0;

  return (
    <div>
        { hasSubmissions
          ? <div>
              {submissions.map(submission => (
                <Submission
                  key={submission.id}
                  submission={submission}
                  handleUpdate={handleUpdate}
                  onFlag={onFlag}
                  handleDelete={handleDelete}
                  isDashboardView={isDashboardView}
                />
              ))}
            </div>
          : <h2 className='submissions__blank-slate'>No Submissions yet, be the first!</h2>
        }

      { allSubmissionsPath &&
        <p className='submissions__view-more'>
          <span>Showing {submissions.length} most recent submissions - </span>
          <a href={allSubmissionsPath}> View full list of solutions</a> or <a href={legacySubmissionsUrl} target='_blank'>View old submissions</a>
        </p>
      }
    </div>
  )
};

SubmissionsList.defaultProps = {
  allSubmissionsPath: '',
  onFlag: noop,
  isDashboardView: false,
}

SubmissionsList.propTypes = {
  submissions: arrayOf(object).isRequired,
  handleDelete: func.isRequired,
  onFlag: func,
  handleUpdate: func.isRequired,
  allSubmissionsPath: string,
  isDashboardView: bool,
}

export default SubmissionsList;
