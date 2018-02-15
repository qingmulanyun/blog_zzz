json.array! @all_items do |item|
  json.name item.name
  json.price item.price
  json.image item.image.url
  json.description item.description
  json.status item.status
  json.shop item.shop
  json.seller item.shop.user.name
  json.createdAt item.created_at
  json.updatedAt item.updated_at
end

