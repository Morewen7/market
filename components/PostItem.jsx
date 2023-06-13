import React from "react";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
    console.log(props)
    return (
      <div className="post">
        <div className="post__content">
          <strong>{props.post.id}. {props.post.title}</strong>
          <div>
            {props.post.body}
          </div>
          <div className="post__btns">
            <MyButton onClick={() => props.remove(props.post)}>
                Удалить
            </MyButton>
            <MyButton onClick={() => props.remove(props.post)}>
                Открыть
            </MyButton>
          </div>
        </div>
      </div>
  );
}

export default PostItem;