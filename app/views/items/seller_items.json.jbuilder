json.array! @items do |item|
  json.id item.id
  json.name item.name
  json.price item.price * 5.3 if item.price.present?
  json.image item.image_url
  json.cost item.cost * 5.3 if item.cost.present?
  json.original_price item.original_price * 5.3 if item.original_price.present?
  json.transport_cost item.transport_cost * 5.3 if item.transport_cost.present?
  json.description item.description
  json.status item.status
  json.createdAt item.created_at
  json.updatedAt item.updated_at
end

