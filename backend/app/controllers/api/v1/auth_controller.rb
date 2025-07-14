# frozen_string_literal: true

module Api
  module V1
    class AuthController < ApplicationController
      def sign_in
        user = User.find_by(email: params[:email])

        if user&.valid_password?(params[:password])
          token = JsonWebToken.encode(user_id: user.id)
          render json: {
            token: token,
            user: user.to_serialized
          }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
    end
  end
end
