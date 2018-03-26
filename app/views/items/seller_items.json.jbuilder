json.array! @items do |item|
  json.id item.id
  json.name item.name
  json.price item.formatted_price
  json.image item.image_url
  json.cost item.formatted_sale_price
  json.original_price item.formatted_original_price
  json.transport_cost item.formatted_transport_cost
  json.description item.description
  json.sales_number item.sales_number
  json.status item.status
  json.createdAt item.created_at
  json.updatedAt item.updated_at
end

