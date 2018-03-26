json.items do
  json.array! @all_items do |item|
    json.id item.id
    json.name item.name
    json.price item.formatted_price
    json.original_price item.display_original_price
    json.transport_cost item.formatted_transport_cost
    json.image item.image.standard.url || '/assets/blog/profile.jpeg'
    json.description item.description
    json.status item.status
    json.starred item.starred
    json.sales_number item.sales_number
    json.shop item.shop
    json.seller item.shop.user.name
    json.createdAt item.created_at
    json.updatedAt item.updated_at
  end
end

json.ads do
  json.array! @all_ads do |ad|
    json.id ad.id
    json.title ad.title
    json.content ad.content
    json.image ad.image.standard.url || '/assets/blog/profile.jpeg'
  end
end

json.starred_items do
  json.array! @all_items.starred do |item|
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
end
