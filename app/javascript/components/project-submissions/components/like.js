import React, { useContext, useMemo } from 'react';
import { object, func } from 'prop-types';
import ProjectSubmissionContext from '../ProjectSubmissionContext';

const Like = ({ submission, handleLikeToggle }) => {
  const { userId } = useContext(ProjectSubmissionContext);
  const isCurrentUsersSubmission = useMemo(() =>
    userId === submission.user_id, [userId, submission.user_id]);

  return (
    <>
      {!isCurrentUsersSubmission
        ?
        <a className='submissions__like hint--top' aria-label={userId !== null ? 'Like submission' : 'Log in to like!'} onClick={(event) => {
          event.preventDefault();
          handleLikeToggle(submission);
        }
        }>
          <i className={submission.is_liked_by_current_user ? 'fa fa-heart liked' : 'fa fa-heart'}></i> {submission.likes}
        </a>
        : ''
      }
    </>
  );
};

Like.propTypes = {
  submission: object.isRequired,
  handleLikeToggle: func.isRequired,
};

export default Like;
