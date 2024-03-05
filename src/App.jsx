import { useState, useEffect } from "react";
import "./App.css";
import AddPost from "./components/addPost";
import Post from "./components/post";

function App() {
  //When a request is made via a REST API,
  //it sends a representation of the resource's current state
  //to the requester or endpoint.
  //This state representation can take the form of JSON(JavaScript Object Notation),
  //XML, or HTML. JSON  is the most widely used file format
  //because it is language - independent and can be read by both humans and machines.

  const [posts, setPosts] = useState([]);

  // GET
  // TODO: Add async/await to these methods
  const fetchPosts = async () => {
    // 1. Lets get our posts via the get method.
    //when using the GET method, which is the default.
    //But for other methods such as POST and DELETE,
    //you'll need to attach the method to the options array:
    // 11. Add constant to fetch
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=8"
    );
    const data = await response.json();
    setPosts(data);
    // fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
    // .then((Response) => Response.json())
    // .then((data) => setPosts(data));
  };

  useEffect(() => {
    // 2. We call the fetchPost() inside the useEffect to prevent
    // the fetch to re - render in eternety.
    // The empty array at the end do this for us.
    fetchPosts();
  }, []);
  // POST
  // 3. When we want to add new post to the api.
  // We have to have these arguments. title, body.
  // TODO: Add async/await to POST method
  const addPost = async (title, body) => {
    // 4. In our fetch, we have to add an object to describe what kind of request it is.
    // 12. Add a constant to fetch() const response = await
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      // 5. We use the POST method her and describe our body = our message
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userID: Math.random().toString(36).slice(2),
      }),
      // 6. We also need to give a header to our message
      // This just tells what kind of data we are sending.
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
    // 7. We will get an respons from the api and handle the new post at our end.
    // 13: change to await
    const data = await response.json();
    //.then((response) => response.json())
    // 8. Here we have to do at trick to get our new post as the latest
    // by ousing spread set as this.
    // 14. Now we only have to remove the .then part and keep setPosts()
    //.then((data) => {
    setPosts((prevPosts) => [data, ...prevPosts]);
    //});
  };

  // Delete!
  // TODO: Add async/await
  const deletePost = async(id) => {
    // 9. We have to pass in a id as argument so the api can track the post we want to delete.
    // 15. change to await and create a constant
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        // We have to supply witch method we want and here is simply the DELETE method we want
        method: "DELETE",
      }
    );
    // Now we want to check the response so our delete was succesful.
    // 16. Now we can remove .then() from our if check
    //.then((response) => {
    if (response.status === 200) {
      setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
      );
    }
    //});
  };

  //TODO: UPDATE/PUT

  return (
    <main>
      <h1>Post message via REST api</h1>
      <AddPost addPost={addPost} />
      <section className="posts-container">
        <h2>Posts</h2>
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            deletePost={deletePost}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
