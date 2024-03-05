import { useState } from "react";

export default function Post(props) {
  // This generat a random function for the post-it 
    const randomColors = (colorArray) => {
      const randomIndex = Math.floor(Math.random() * colorArray.length);
      return colorArray[randomIndex];
    };
    // only these colors are allowed
    const colors = ["pink", "orange", "yellow", "aqua", "green"];

    const [backgroundColor] = useState(
      randomColors(colors)
    );
  return (
    <div className="post-card" style={{ backgroundColor: backgroundColor }}>
      <h2 className="post-title">{props.title}</h2>
      <p className="post-body">{props.body}</p>
      <button className="btn-update" onClick={() => props.updatePost(props.id)}>
       Update
      </button>
      <button className="btn-delete" onClick={() => props.deletePost(props.id)}>
        Delete
      </button>
    </div>
  );
}
