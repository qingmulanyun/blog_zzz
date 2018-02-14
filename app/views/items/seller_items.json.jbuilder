json.array! @items do |item|
  json.name item.name
  json.price item.price
  json.image item.image_url
  json.cost item.cost
  json.description item.description
  json.status item.status
  json.createdAt item.created_at
  json.updatedAt item.updated_at
end

