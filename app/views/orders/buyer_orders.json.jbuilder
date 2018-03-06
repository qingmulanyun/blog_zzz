json.array! @orders do |order|
  json.id order.id
  json.created_at order.created_at
  json.shop_name order.shop.name
  json.status order.status
  json.items order.order_items.each do |order_item|
    json.image order_item.item.image
    json.item_info do
      json.item_id order_item.item.id
      json.name order_item.item.name
    end
    json.price order_item.price
    json.quantity order_item.quantity
    json.total_price (order_item.quantity * order_item.formatted_price) + order_item.formatted_transport_cost
  end
  json.actions do
    json.id order.id
  end
end

