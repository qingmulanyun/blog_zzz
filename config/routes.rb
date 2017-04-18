Rails.application.routes.draw do
  devise_for :admin, only: :sessions, controllers: {sessions: 'admin'}
  mount RailsAdmin::Engine => '/product_support', as: 'rails_admin'
  mount Ckeditor::Engine => '/ckeditor'
  devise_for :users
  root 'session#root'

  get 'get_public_posts', to: 'session#show_public_posts'

  get 'posts/:id', to: 'posts#show_public_post'

  # this route configure will make routes pretty much catches all requests and you should have them last in your routes.rb so that other routes matches first.
  resources :users, path: '' do
    resources :posts, path: '', except: [:index]
  end

end
