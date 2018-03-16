# Order
get '/orders/my_orders', to: 'orders#index'


# API
post '/orders/api/create', to: 'orders#create'
get '/orders/api/buyer_orders', to: 'orders#buyer_orders'
get '/orders/api/seller_orders', to: 'orders#seller_orders'
patch '/orders/api/cancel', to: 'orders#cancel'
patch '/orders/api/update', to: 'orders#update'
patch '/orders/api/update_delivery_track_number',  to: 'orders#update_delivery_track_number'
get '/orders/api/delivery_tracking', to: 'orders#delivery_tracking'
patch '/orders/api/confirm_delivered', to: 'orders#confirm_delivered'