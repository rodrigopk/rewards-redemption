# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'auth/sign_in', to: 'auth#sign_in'
      get 'points', to: 'users#points'

      resources :rewards, only: [:index]
      resources :redemptions, only: %i[index create]
    end
  end
end
