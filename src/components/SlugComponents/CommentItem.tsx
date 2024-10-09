import { useState } from 'react';
import defaultProfileImage from '../../../public/tokens/noProfileImage.png'
import unprotectLinkOfCFIPFS from '@/utils/unprotectLinkOfCFIPFS';

const CommentItem: React.FC<{ comment: Comment; isCreator: boolean }> = ({ comment, isCreator }) => {
  const [isImageFullSize, setIsImageFullSize] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const handleImageClick = () => {
    setIsImageFullSize(!isImageFullSize);
  };

  const handleTextClick = () => {
    setIsTextExpanded(!isTextExpanded);
  };

  const profileImage = comment.profile_image || defaultProfileImage.src;
  const username = comment.username ? comment.username : comment.user.slice(0, 6);
  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <div key={comment.id} className={`comment mb-4 p-4 border rounded max-w-full bg-gradient-to-r from-[#01080b] to-transparent ${isCreator ? 'border-primary' : ''}`}>
      <div className="comment-header flex items-center mb-2">
        <img src={profileImage} alt="Profile" className="profile-image w-6 h-6 rounded-full mr-2" /> {/* Altera o tamanho da imagem do perfil do usuário */}
        <span className="username font-semibold">
          {username} {isCreator && <span className="text-xs text-yellow-500">(Dev)</span>}
        </span>
        <span className="timestamp text-sm text-gray-100 ml-2">{formatDate(comment.timestamp)}</span>
      </div>
      <div className="comment-content flex items-start">
        {comment.file_uri && (
          <img
            src={unprotectLinkOfCFIPFS(comment.file_uri) || undefined}
            alt="Comment Image"
            className={`comment-image cursor-pointer mr-2 ${isImageFullSize ? 'max-w-full' : 'w-40 h-40'}`} // Altera o tamanho da imagem do comentário
            onClick={handleImageClick}
          />
        )}
        <p className={`flex-1 ${isTextExpanded ? '' : 'overflow-hidden text-ellipsis'}`}>
          {isTextExpanded ? comment.text : comment.text.slice(0, 100)}
          {!isTextExpanded && comment.text.length > 100 && (
            <span className="cursor-pointer text-inherit" onClick={handleTextClick}>[...]</span>
          )}
        </p>
        {isTextExpanded && (
          <span className="cursor-pointer text-inherit" onClick={handleTextClick}> [Show less]</span>
        )}
      </div>
    </div>
  );
};

export default CommentItem;