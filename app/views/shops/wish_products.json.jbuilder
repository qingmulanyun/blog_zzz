json.array! @wish_products do |wish_product|
  json.id wish_product.id
  json.name wish_product.name
  json.updated_at wish_product.updated_at
  json.user_name wish_product.user.name
  json.description wish_product.description
  json.image wish_product.image.standard.url || '/assets/blog/profile.jpeg'
end

