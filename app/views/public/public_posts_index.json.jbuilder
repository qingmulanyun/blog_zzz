json.array! @posts do |post|
  json.merge! post.attributes
  json.author post.user.name
  json.author_id post.user.slug
  json.comments_counter post.comments.count
  json.votes post.post_votes.where(vote: true).count
end
