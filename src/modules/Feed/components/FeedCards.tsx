// ** Packages **
import { Card, Col, Input, Row, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";

// ** Components **
import PageLoader from "../../../components/Loaders/PageLoader";
import NoDataFound from "../../../components/NoDataFound";
import CommentSection from "./CommentSection";

// ** Service **
import { useGetCommentsAPI, useGetPostsAPI } from "../service/feed.service";

// ** Types **
import type { FeedInfoState } from "../types";

const { Title, Paragraph } = Typography;
const { Search } = Input;

const POSTS_PER_PAGE = 10;

const FeedCards = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardList, setCardList] = useState<FeedInfoState[] | null>([]);
  const [activePostId, setActivePostId] = useState<number | null>(null);
  const [commentsMap, setCommentsMap] = useState<{ [key: number]: any[] }>({});

  const { getPosts, isLoading } = useGetPostsAPI();
  const { getComments } = useGetCommentsAPI();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        if (displayedPosts.length < (filteredPosts.length || 0)) {
          setPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [cardList, page, searchTerm]);

  const getData = async () => {
    const { data, error } = await getPosts({});
    if (!error && data?.length) {
      setCardList(data);
    }
  };

  // Function to fetch comments for a post
  const fetchComments = async (postId: number) => {
    const { data, error } = await getComments(postId);
    if (!error && data) {
      setCommentsMap((prev) => ({ ...prev, [postId]: data }));
    }
  };

  const onChange = (value: string) => {
    setSearchTerm(value.toLowerCase());
    setPage(1);
  };

  const handlePostClick = (postId: number) => {
    if (activePostId === postId) {
      setActivePostId(null); // toggle off
    } else {
      setActivePostId(postId);
      if (!commentsMap[postId]) {
        fetchComments(postId);
      }
    }
  };

  const filteredPosts = useMemo(
    () =>
      cardList?.filter((post) =>
        post.title.toLowerCase().includes(searchTerm)
      ) || [],
    [cardList, searchTerm]
  );
  const displayedPosts = filteredPosts.slice(0, page * POSTS_PER_PAGE);

  return (
    <>
      {/* Search Bar */}
      <Row gutter={[24, 24]}>
        <Col style={{ width: "100%" }}>
          <Search
            placeholder="search post"
            allowClear
            onChange={(e) => onChange(e.target.value)}
            value={searchTerm}
          />
        </Col>
      </Row>

      {/* Posts */}
      <Row gutter={[24, 24]}>
        {isLoading ? (
          <PageLoader />
        ) : displayedPosts && displayedPosts.length ? (
          displayedPosts.map((post) => (
            <Col
              key={post.id}
              xs={24}
              sm={12}
              md={12}
              lg={6}
              style={{ minHeight: "240px" }}
            >
              <Card
                style={{
                  height: "auto",
                  background: "rgba(153, 153, 81, 0.26)",
                  cursor: "pointer",
                }}
                onClick={() => handlePostClick(post.id)}
              >
                <Title level={4}>{post.title}</Title>
                <Paragraph>{post.body}</Paragraph>
                {/* Show comments if post is active */}
                {activePostId === post.id && commentsMap[post.id] && (
                  <CommentSection commentsMap={commentsMap} postId={post.id} />
                )}
              </Card>
            </Col>
          ))
        ) : (
          <NoDataFound />
        )}
      </Row>
    </>
  );
};

export default FeedCards;
