import { Dropdown } from "react-bootstrap";
import { DropdownButton } from "react-bootstrap";
import React, { useContext, useEffect, useState } from "react";
import {
  CommentText,
  CommentMetadata,
  CommentGroup,
  CommentContent,
  CommentAvatar,
  CommentActions,
  CommentAction,
  CommentAuthor,
  FormTextArea,
  Button,
  Comment,
  Form,
  Header,
} from "semantic-ui-react";
import ReactTimeAgo from "react-time-ago";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { postComment } from "../../services/commentService";
import { getComments,deleteCommentById } from "../../services/commentService";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import vi from "javascript-time-ago/locale/vi.json";
import "./Comment.scss";
import EmojiPicker from "emoji-picker-react";
import { ActiveContext } from "../../views/App";
import { toast } from "react-toastify";
const CommentComponent = (props) => {
  TimeAgo.addDefaultLocale(vi);
  TimeAgo.addLocale(ru);
  const { productId, setShowCommentComponent } = props;
  const [showEmoji, setShowEmoji] = useState(false);
  const userId = localStorage.getItem("userId");
  const [comments, setComments] = useState([]);
  const [dataComment, setDataComment] = useState({
    message: "",
    userId,
    productId,
  });
  const {infoUser} = useContext(ActiveContext)
  const getAllComments = async (id) => {
    const result = await getComments(id);
    if (result) {
      setComments(result);
    }
  };
  useEffect(() => {
    getAllComments(productId);
  }, []);
  const handleChange = (e) => {
    setDataComment({ ...dataComment, message: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log(userId);
    if (dataComment.message !== "" && userId) {
      await postComment(dataComment);
      setDataComment({ ...dataComment, message: "" });
      getAllComments(productId);
    }
  };
  const handleEmojiClick = (e) => {
    setDataComment((prev) => ({ ...prev, message: prev.message + e.emoji }));
  };
  const handleDeleteComment = async(id) =>{
    try{
      await deleteCommentById(id)
      getAllComments(productId);
    }
    catch(e){
      toast.error("Đã xảy ra lỗi vui lòng thử lại!",{
        autoClose:1000
      })
    }
  }
  return (
    <CommentGroup>
      <h3>Bình luận</h3>
      <hr></hr>
      {comments &&
        comments.length > 0 &&
        comments.map((comment, index) => {
          return (
            <Comment className="d-flex">
              <div className="comment-div">
                <CommentAvatar
                  className="mx-3"
                  src="/images/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                />
                <CommentContent>
                  <CommentAuthor as="a">{comment.user.userName}</CommentAuthor>
                  <CommentMetadata>
                    <ReactTimeAgo date={comment.createDate} locale="vi-VN" />
                  </CommentMetadata>
                  <CommentText>{comment.content}</CommentText>
                </CommentContent>
              </div>
              <div className="delete-comment">
                <DropdownButton
                className={infoUser.username === "admin" ? "" : localStorage.getItem("userId") === comment.user.id ? "" : "d-none"}
                  id="dropdown-basic-button"
                  title={
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      style={{ color: "#000000" }}
                    />
                  }
                >
                  <Dropdown.Item onClick={()=>{
                    handleDeleteComment(comment.id)
                  }}>Gỡ bình luận</Dropdown.Item>
                </DropdownButton>
              </div>
            </Comment>
          );
        })}
      <Form reply>
        <FormTextArea
          className="mt-4"
          onInput={handleChange}
          value={dataComment.message}
        />
        <div className="btn-reply">
          <Button
            content="Add Comment"
            labelPosition="left"
            icon="edit"
            primary
            onClick={handleSubmit}
          />
          <Button
            className="btn-show-emoji"
            onClick={(e) => {
              setShowEmoji(!showEmoji);
            }}
          >
            <FontAwesomeIcon icon={faFaceSmile} />
          </Button>
          {showEmoji && (
            <div className="form-emoji">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </Form>
      <div className="show-off-comment">
        <FontAwesomeIcon
          icon={faChevronUp}
          onClick={() => setShowCommentComponent(false)}
        />
      </div>
    </CommentGroup>
  );
};
export default CommentComponent;
