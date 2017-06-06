json.array! @user.posts do |post|
  json.post_name post.title
  json.lat post.latitude
  json.lng post.longitude
  json.created_at post.created_at
end
