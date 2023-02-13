Rails.application.routes.draw do
  resources :posts
  resources :users
  resources :follow
  resources :like, only: [:index, :create, :destroy]
  post '/signup', to: 'users#create'
  post '/login', to: 'session#create'
  delete "/logout", to: "session#destroy"
  get '/me', to: 'session#show'
  get '/users/:id/followers', to: 'users#followers'
  get '/users/:id/followings', to: 'users#followings'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
