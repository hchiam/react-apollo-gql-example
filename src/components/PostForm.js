import React from "react";

const classes = {
  container: "w-full max-w-md",
  label: "text-sm block font-bold  pb-2",
  input:
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300",
  button:
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
  form: "px-8 py-8 pt-8",
  div: "px-4 pb-4",
  error: "font-bold text-red-500"
};

function PostForm({ onSave, post, loading, error }) {
  const [title, setTitle] = React.useState(post?.title);
  const [body, setBody] = React.useState(post?.body);
  function onSubmit(event) {
    event.preventDefault();
    onSave({ title, body });
  }
  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit} className={classes.form}>
        <div className={classes.div}>
          <label className={classes.label}>Title</label>
          <input
            required
            name="title"
            placeholder="Enter your post title"
            className={classes.input}
            onChange={(event) => setTitle(event.target.value)}
            defaultValue={title} /* use hook, not post.title !!! */
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Body</label>
          <textarea
            required
            name="body"
            className={classes.input}
            placeholder="Enter your post content"
            onChange={(event) => setBody(event.target.value)}
            defaultValue={body} /* use hook, not post.body !!! */
          />
        </div>
        <div>
          <button disabled={loading} className={classes.button} type="submit">
            Submit
          </button>
        </div>
        {error && <p class={classes.error}>{error.message}</p>}
      </form>
    </div>
  );
}

export default PostForm;
