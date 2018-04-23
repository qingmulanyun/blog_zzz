# Shop
get '/shops/my_shop', to: 'shops#my_shop'
get '/shops/my_shop/shop_report', to: 'shops#shop_report'

get '/shops/seller_orders', to: 'orders#admin_index'
get '/shops/sale_report', to: 'shops#sale_report'
get '/shops/approved_wish_products', to: 'shops#approved_wish_products_index'