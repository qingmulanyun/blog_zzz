json.array! @cart_items do |cart_item|
  json.id cart_item.id
  json.item_id cart_item.item.id
  json.name cart_item.item.name
  json.price cart_item.item.formatted_price
  json.image cart_item.item.image
  json.transport_cost cart_item.item.formatted_transport_cost
  json.quantity cart_item.quantity
  json.total_price (cart_item.item.formatted_price * cart_item.quantity).round(2)
  json.shop_id cart_item.item.shop.id
  json.shop_name cart_item.item.shop.name
  json.item_info do
    json.item_id cart_item.item.id
    json.name cart_item.item.name
  end
  json.actions do
    json.id cart_item.id
    json.name cart_item.item.name
    json.quantity cart_item.quantity
  end
end

