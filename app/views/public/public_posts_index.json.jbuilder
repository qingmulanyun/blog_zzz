json.array! @posts do |post|
  json.merge! post.attributes
  json.author post.user.name
end
