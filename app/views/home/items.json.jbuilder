json.array! @items do |item|
  json.id item.id
  json.name item.name
  json.price item.formatted_price
  json.original_price item.display_original_price
  json.transport_cost item.formatted_transport_cost
  json.image item.image.standard.url || '/assets/blog/profile.jpeg'
  json.description item.description
  json.status item.status
  json.starred item.starred
  json.shop item.shop
  json.seller item.shop.user.name
  json.createdAt item.created_at
  json.updatedAt item.updated_at
end

