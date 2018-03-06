# Order
get '/orders/my_orders', to: 'orders#index'


# API
post '/orders/api/create', to: 'orders#create'
get '/orders/api/buyer_orders', to: 'orders#buyer_orders'
patch '/orders/api/cancel', to: 'orders#cancel'