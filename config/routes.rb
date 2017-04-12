Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  devise_for :users
  root 'session#root'

  get 'get_public_posts', to: 'session#show_public_posts'




  # this route configure will make routes pretty much catches all requests and you should have them last in your routes.rb so that other routes matches first.
  resources :users, path: '' do
    resources :posts, path: '', except: [:index]
  end

end
