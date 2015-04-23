NewsReader::Application.routes.draw do
  namespace :api do
    resources :feeds, only: [:index, :create, :show, :destroy] do
      resources :entries, only: [:index]
    end
    post 'feeds/:feed_id/userfeed', to: 'user_feeds#create'
    delete 'feeds/:feed_id/userfeed', to: 'user_feeds#destroy'
  end

  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]
  root to: "static_pages#index"
end
