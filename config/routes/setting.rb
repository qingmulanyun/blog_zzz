# Setting

get 'setting', to: 'setting#profile'
get 'setting/addresses', to: 'setting#profile'
get 'setting/profile', to: 'setting#profile'

# Api

get '/setting/api/profile_info', to: 'setting#profile_info'
get '/setting/api/addresses', to: 'setting#addresses_index'
patch '/setting/api/profile_info', to: 'setting#update_profile_info'
post '/setting/api/address', to: 'setting#create_address'
