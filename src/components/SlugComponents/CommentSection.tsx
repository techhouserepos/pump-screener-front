import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';
import unprotectLinkOfCFIPFS from '@/utils/unprotectLinkOfCFIPFS';

const CommentSection: React.FC<{ tokenAddress: string, creator: string }> = ({ tokenAddress, creator }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsData = await axios.get(`/api/replies/${tokenAddress}`);
        setComments(commentsData.data.map((comment: Comment) => ({
          ...comment,
          profile_image: unprotectLinkOfCFIPFS(comment.profile_image),
        })));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Refresh Time

    return () => clearInterval(intervalId); // Clear Interval
  }, [tokenAddress]);

  return (
    <div>
      {comments.map(comment => {
        const isCreator = comment.user === creator;
        return (
          <CommentItem key={comment.id} comment={comment} isCreator={isCreator} />
        );
      })}
    </div>
  );
};

export default CommentSection;
