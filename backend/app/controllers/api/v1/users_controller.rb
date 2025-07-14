# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!

      def points
        render json: {
          user_id: current_user.id,
          points: current_user.points
        }, status: :ok
      end
    end
  end
end
