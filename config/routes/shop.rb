# Shop
get '/shops/my_shop', to: 'shops#my_shop'
get '/shops/my_shop/shop_report', to: 'shops#shop_report'

get '/shops/seller_orders', to: 'orders#admin_index'