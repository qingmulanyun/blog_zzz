# Cart

get '/carts/cart_items', to: 'carts#index'

# API
get '/carts/api/cart_items', to: 'carts#show_items'
post '/carts/api/add_item', to: 'carts#add_item'
delete '/carts/api/destroy_item', to: 'carts#destroy_item'
patch '/carts/api/update_cart_item', to: 'carts#update_item'
