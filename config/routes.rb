Rails.application.routes.draw do
  devise_for :admin, only: :sessions, controllers: {sessions: 'admin'}
  mount RailsAdmin::Engine => '/product_support', as: 'rails_admin'

  devise_for :users, controllers: {sessions: 'sessions', omniauth_callbacks: 'omniauth_callbacks', passwords: 'passwords'}
  root 'public#root'

  get 'get_public_posts', to: 'public#public_posts_index'

  get 'posts/:id', to: 'public#show_public_post'

  # user related after login
  get 'public_hub', to: 'users#public_hub'

  get 'foot_print', to: 'users#foot_print'

  get 'foot_print_data', to: 'users#foot_print_data'

  get 'public_transport_train', to: 'transport#public_transport'

  get 'public_transport_tracking', to: 'transport#public_transport_tracking'

  get 'public_transport_timetable', to: 'transport#public_transport_time_table'

  # this route configure will make routes pretty much catches all requests and you should have them last in your routes.rb so that other routes matches first.
  resources :users, path: '' do
    member do
      get 'archive' => :archive_root
      get 'archive/:year' => :archive_year
      get 'archive/:year/:month' => :archive_month
    end
    resources :posts, path: '', except: [:index]
  end

  resources :posts, path: '' do
    resources :comments
  end
  resources :items
end
