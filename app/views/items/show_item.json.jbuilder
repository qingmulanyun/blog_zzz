json.id @item.id
json.name @item.name
json.price @item.price * 5.3
json.original_price @item.original_price * 5.3 if @item.original_price.present?
json.transport_cost @item.transport_cost * 5.3 if @item.transport_cost.present?
json.image @item.image.url || '/assets/blog/profile.jpeg'
json.description @item.description
json.status @item.status
json.shop @item.shop
json.seller @item.shop.user.name
json.createdAt @item.created_at
json.updatedAt @item.updated_at