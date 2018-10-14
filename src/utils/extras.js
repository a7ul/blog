export const blackListMediumPost = (mediumPosts) => {
  const filteredPosts = mediumPosts.filter((eachPost) => {
    const publishDate = new Date(eachPost.node.firstPublishedAt);
    return publishDate < new Date('21 July, 2018');
  });
  return filteredPosts;
};
const ex = {};
export default ex;
