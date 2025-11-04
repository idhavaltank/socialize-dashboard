import Title from "antd/es/typography/Title";

const CommentSection = (props: {
  commentsMap: { [key: number]: any[] };
  postId: number;
}) => {
  const { commentsMap, postId } = props;
  return (
    <>
      <Title level={4}>: Comment Section :</Title>
      <div style={{ marginTop: 10, paddingLeft: 10 }}>
        {commentsMap[postId].map((comment) => (
          <div key={comment.id} style={{ marginBottom: 8 }}>
            <strong>{comment.name}</strong>: {comment.body}
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentSection;
