json.array! @cart_items do |cart_item|
  json.id cart_item.id
  json.item_id cart_item.item.id
  json.name cart_item.item.name
  json.price cart_item.item.formatted_price
  json.image cart_item.item.image
  json.transport_cost cart_item.item.formatted_transport_cost
  json.quantity cart_item.quantity
end

