Rails.application.routes.draw do
  def draw(routes_name) #FIND ROUTES VIA FILE NAME
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
  end

  devise_for :admin, only: :sessions, controllers: {sessions: 'admin'}
  mount RailsAdmin::Engine => '/product_support', as: 'rails_admin'

  devise_for :users, controllers: {sessions: 'sessions', omniauth_callbacks: 'omniauth_callbacks', passwords: 'passwords', registrations: 'registrations'}
  root 'home#show'

  resources :users do
    resources :shops, except: :create
  end

  draw :item
  draw :shop
  draw :home
end
