# frozen_string_literal: true

module Api
  module V1
    class RedemptionsController < ApplicationController
      before_action :authenticate_user!

      def index
        redemptions = current_user.redemptions.includes(:reward).order(created_at: :desc)

        render json: redemptions.map(&:to_serialized), status: :ok
      end
    end
  end
end
