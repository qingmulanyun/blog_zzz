# Item

# API
get '/items/api/seller_items', to: 'items#seller_items'
get '/items/api/all_items', to: 'items#all_items'
get '/items/api/show_item', to: 'items#show_item'
post '/items/api/create_seller_item', to: 'items#create_seller_item'

delete '/items/api/delete_items', to: 'items#destroy_items'

# Recourse

resources :items , only: [:show]