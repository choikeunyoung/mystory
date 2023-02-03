import React from "react";
import Comment from "./Comment"

const comments = [
    {
        name: "최근영",
        comment: "앙 배곱띠",
    },
    {
        name: "김두연",
        comment: "헝 구리",
    },
    {
        name: "근연",
        comment: "힝",
    },
];

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment.comment} />
                );
            })}
        </div>
    );
}

export default CommentList;