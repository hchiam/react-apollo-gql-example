import React from "react";
import PostForm from "./PostForm";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useParams, useHistory } from "react-router-dom";

const classes = {
  div: "bg-white border rounded-lg overflow-hidden",
  header: "bg-gray-300 text-gray-700 py-3 px-4",
  h2: "text-sm font-semibold"
};

const GET_POST = gql`
  query GetPosts($id: uuid!) {
    posts_by_pk(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($id: uuid!, $title: String!, $body: String!) {
    update_posts(
      where: { id: { _eq: $id } }
      _set: { title: $title, body: $body }
    ) {
      returning {
        title
        body
      }
    }
  }
`;

function EditPost() {
  const { id } = useParams();
  const history = useHistory();
  const { loading, data } = useQuery(GET_POST, { variables: { id } });
  // to avoid name conflict, you can rename loading from useMutation as loading2:
  const [updatePost, { loading: loading2, error }] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      // go back to home page:
      history.push("/");
    }
  });
  if (loading) return <div>Loading...</div>;
  function onSave({ title, body }) {
    // don't forget to put inside a variables object!
    updatePost({ variables: { id, title, body } });
  }
  return (
    <div className={classes.div}>
      <header className={classes.header}>
        <h2 className={classes.h2}>Edit Post</h2>
      </header>
      <PostForm
        post={data.posts_by_pk}
        onSave={onSave}
        loading={loading2} // this is the loading from useMutation(UPDATE_POST
        error={error}
      />
    </div>
  );
}

export default EditPost;
