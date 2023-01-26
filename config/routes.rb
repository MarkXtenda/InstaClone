Rails.application.routes.draw do
  resources :posts
  resources :users

  post '/signup', to: 'users#create'
  post '/login', to: 'session#create'
  delete "/logout", to: "session#destroy"
  get '/me', to: 'users#show'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
