import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSec({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  console.log(comments);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([...comments, data]);
      }
    } catch (error) {
      setComment(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-600 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            className=" text-teal-500 hover:underline"
            to={"/dashboard?tab=profile"}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-600 my-5 flex gap-1">
          You must be logged in to comment.
          <Link className=" text-blue-800 hover:underline" to={"/signin"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-600 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="250"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} charecters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Add
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm my-5">No comments yet</p>
      ) : (
        <>
          <div className=" flex text-sm my-5 items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-500 py-1 px-2 rounded-sm ">
              <p>{comments.length}</p>
            </div>
          </div>
          {
            comments.map(comment => (
                <Comment key={comment._id} comment = {comment}  />
            ))
          }
        </>
      )}
    </div>
  );
}
