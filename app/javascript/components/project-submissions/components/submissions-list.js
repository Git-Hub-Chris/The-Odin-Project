import React, { useContext } from 'react';
import { object, func, arrayOf, string, bool } from 'prop-types';

import Submission from './submission';
import ProjectSubmissionContext from '../ProjectSubmissionContext';

const noop = () => {};

const SubmissionsList = ({ submissions, handleDelete, onFlag, handleUpdate, isDashboardView }) => {
  const { allSubmissionsPath, legacySubmissionsUrl } = useContext(ProjectSubmissionContext);

  return (
    <div>
      <div>
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

      { allSubmissionsPath.length > 0 &&
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
